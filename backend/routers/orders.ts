import express from 'express';
import mongoose, { HydratedDocument } from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import Order from '../models/Order';
import { calculateTotalPrice } from './baskets';
import axios from 'axios';
import permit from '../middleware/permit';
import { IOrder } from '../types';
import User from '../models/User';
import Product from '../models/Product';

const ordersRouter = express.Router();

const chatIds = ['640421282']; // Массив с chat_id

ordersRouter.post('/', async (req, res, next) => {
  try {
    const order = new Order({
      createdAt: new Date().toISOString(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      email: req.body.email,
      paymentMethod: req.body.paymentMethod,
      deliveryMethod: req.body.deliveryMethod,
      orderComment: req.body.orderComment,
      products: req.body.products,
    });

    order.totalPrice = await calculateTotalPrice(order.products);
    await order.save();

    const message = `Новый - Заказ №: ${order.orderArt.toUpperCase()} Ожидает обработки!`;
    await sendMessageToTelegram(message, chatIds);

    return res.send({
      message: {
        en: 'OrderForm created successfully',
        ru: 'Заказ успешно создан',
      },
    });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

ordersRouter.post('/user', auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  try {
    if (user) {
      const order = new Order({
        user_id: user._id,
        createdAt: new Date().toISOString(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        email: req.body.email,
        paymentMethod: req.body.paymentMethod,
        deliveryMethod: req.body.deliveryMethod,
        orderComment: req.body.orderComment,
        products: req.body.products,
      });

      order.totalPrice = await calculateTotalPrice(order.products);
      await order.save();

      const message = `Новый - Заказ №: ${order.orderArt.toUpperCase()} Ожидает обработки!`;

      await sendMessageToTelegram(message, chatIds);

      return res.send({
        message: {
          en: 'OrderForm created successfully',
          ru: 'Заказ успешно создан',
        },
      });
    } else {
      return res.send({ message: 'User & sessionKey not found' });
    }
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

ordersRouter.get('/', auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  try {
    let query = {};

    switch (user.role) {
      case 'admin':
        query = {
          admin_id: req.query.admin,
          ...(req.query.admin ? {} : { status: 'open', admin_id: undefined }),
        };
        break;
      case 'director':
        query = {
          admin_id: req.query.admin,
          ...(req.query.admin ? { status: 'closed' } : { status: 'closed' }),
        };
        break;
      case 'user':
        query = { user_id: user.id };
        break;
      default:
        return res.status(403).send('Unauthorized');
    }

    // Добавляем пагинацию
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const pageSize = 15;
    const skip = (page - 1) * pageSize;

    const orders = await Order.find(query)
      .skip(skip)
      .limit(pageSize)
      .populate('user_id', '-token')
      .populate('admin_id', '-token')
      .exec();

    if (!orders || orders.length === 0) {
      return res.send({ message: 'No orders found' });
    }

    // Добавляем информацию о пагинации в ответ
    const totalOrders = await Order.countDocuments(query);
    const totalPages = Math.ceil(totalOrders / pageSize);

    const formattedOrders = await Promise.all(
      orders.map(async (order) => {
        const productsWithDetails = await Promise.all(
          order.products.map(async (productData) => {
            const product = await Product.findOne({ goodID: productData.product }).exec();
            return {
              product: product,
              quantity: productData.quantity,
            };
          }),
        );

        return {
          _id: order._id,
          orderArt: order.orderArt,
          user_id: order.user_id,
          admin_id: order.admin_id,
          createdAt: order.createdAt,
          status: order.status,
          totalPrice: order.totalPrice,
          firstName: order.firstName,
          lastName: order.lastName,
          phoneNumber: order.phoneNumber,
          address: order.address,
          email: order.email,
          paymentMethod: order.paymentMethod,
          deliveryMethod: order.deliveryMethod,
          orderComment: order.orderComment,
          products: productsWithDetails,
        };
      }),
    );

    return res.send({
      orders: formattedOrders,
      pageInfo: {
        currentPage: page,
        totalPages,
        pageSize,
        totalItems: totalOrders,
      },
    });
  } catch (e) {
    return next(e);
  }
});

ordersRouter.patch('/:id', auth, permit('admin'), async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  try {
    const updatedFields = { ...req.body };
    updatedFields.admin_id = user._id;

    const order: HydratedDocument<IOrder> | null = await Order.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updatedFields },
      { new: true },
    );

    if (!order) {
      return res.status(404).send({ message: { en: 'cant find order', ru: 'заказ не найден' } });
    }

    if (req.body.status === 'closed') {
      const orderOwner = await User.findById(order.user_id);
      if (!orderOwner) {
        return res.status(403).send({
          message: {
            en: 'Cant find order owner',
            ru: 'Владельца заказа нет в системе',
          },
        });
      }
    }

    let message = '';

    if (req.body.status === 'in progress') {
      message = `Оформление - Заказ №: ${order.orderArt.toUpperCase()} , забрал(а) ${user.firstName} ${
        user.lastName
      } для оформления`;
    } else if (req.body.status === 'closed') {
      message = `Закрыт - Заказ №: ${order.orderArt.toUpperCase()} , оформлен и закрыт. администратором - ${
        user.firstName
      } ${user.lastName}`;
    }
    await sendMessageToTelegram(message, chatIds);

    return res.send({
      message: {
        en: 'OrderForm updated successfully',
        ru: 'Заказ успешно изменен',
      },
    });
  } catch (e) {
    return next(e);
  }
});

ordersRouter.delete('/:id', auth, permit('admin', 'director', 'user'), async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  const order = await Order.findById(req.params.id);
  try {
    if (order) {
      if (user.role === 'admin' || user.role === 'director') {
        await Order.deleteOne({ _id: req.params.id });
        return res.send({
          message: {
            en: 'OrderForm deleted successfully',
            ru: 'Заказ успешно удалён',
          },
        });
      }

      if (user.role === 'user') {
        if (order.user_id) {
          if (order.user_id.toString() === user._id.toString()) {
            await Order.deleteOne({ _id: req.params.id, userId: user._id });
            return res.send({
              message: {
                en: 'OrderForm deleted successfully',
                ru: 'Заказ успешно удалён',
              },
            });
          } else {
            return res.send({
              message: {
                en: 'no permission for this action',
                ru: 'нет прав для этого действия',
              },
            });
          }
        }
      }
    } else {
      return res.status(404).send({ message: 'Cant find order' });
    }
  } catch (e) {
    return next(e);
  }
});
export default ordersRouter;

const botToken = '6719177853:AAG43TUbzPaH5MtbciFBPse-jhKcvyYw1IQ';
let lastRequestTime = 0;
const minInterval = 20000; // 1 минута в миллисекундах

const sendMessageToTelegram = async (message: string, chatIds: string[]) => {
  const currentTime = Date.now();

  if (currentTime - lastRequestTime < minInterval) {
    console.log('Слишком частые запросы. Подождите.');
    return;
  }

  try {
    chatIds.map(async (item) => {
      await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: item,
        text: message,
      });
    });
    console.log('Message sent to Telegram:');
  } catch (error) {
    console.error('Error sending message to Telegram:');
  } finally {
    lastRequestTime = currentTime;
  }
};
