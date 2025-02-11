import express from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import Discount from '../models/Discount';

const discountsRouter = express.Router();

discountsRouter.post('/', async (req, res, next) => {
  try {
    // Очистка телефона от всех символов, кроме цифр
    const cleanedPhone = req.body.phone.replace(/\D+/g, '');

    const discount = new Discount({
      name: req.body.name,
      phone: cleanedPhone,
      source: req.body.source,
    });

    await discount.save();
    return res.send({ message: 'Successfully created!', discount });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

discountsRouter.get('/', async (req, res, next) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const pageSize = 20;

    // Нормализуем поисковую строку
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';

    // Формируем запрос
    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } }, // Поиск в имени
            { phone: { $regex: search } }, // Поиск в телефоне
          ],
        }
      : {};

    // Получаем общее количество записей
    const totalDiscounts = await Discount.countDocuments(searchQuery);

    // Получаем данные с учётом пагинации и сортировки
    const discounts = await Discount.find(searchQuery)
      .sort({ created_date: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return res.send({
      discounts,
      pageInfo: {
        currentPage: page,
        totalPages: Math.ceil(totalDiscounts / pageSize),
        pageSize,
        totalItems: totalDiscounts,
      },
    });
  } catch (error) {
    return next(error);
  }
});

discountsRouter.get('/all', async (req, res, next) => {
  try {
    const discounts = await Discount.find();

    return res.send(discounts);
  } catch (error) {
    return next(error);
  }
});

discountsRouter.delete('/:id', auth, permit('admin', 'director'), async (req, res, next) => {
  try {
    const discount = await Discount.findById(req.params.id);

    if (!discount) {
      return res.status(404).send({
        message: {
          en: 'Record not found!',
          ru: 'Запись не найдена!',
        },
      });
    }

    await discount.deleteOne();

    return res.send({
      message: {
        en: 'The entry has been successfully deleted!',
        ru: 'Запись успешно удалена!',
      },
    });
  } catch (error) {
    next(error);
  }
});

export default discountsRouter;
