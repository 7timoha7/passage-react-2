import mongoose from 'mongoose';
import config from './config';
import crypto from 'crypto';
import User from './models/User';
import Order from './models/Order';

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    // await db.dropCollection('categories');
    // await db.dropCollection('products');
    await db.dropCollection('baskets');
    await db.dropCollection('orders');
    await db.dropCollection('chatidadmins');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [admin, user, director] = await User.create(
    {
      email: 'admin@gmail.com',
      firstName: 'Admin',
      lastName: 'Adminich',
      password: '123',
      token: crypto.randomUUID(),
      role: 'admin',
      phoneNumber: '0555 777777',
      isVerified: true,
    },
    {
      email: 'user@gmail.com',
      firstName: 'User',
      lastName: 'Userovich',
      password: '123',
      token: crypto.randomUUID(),
      role: 'user',
      phoneNumber: '0555 9999999',
      isVerified: true,
    },
    {
      email: 'director@gmail.com',
      firstName: 'Director',
      lastName: 'Directorovich',
      password: '123',
      token: crypto.randomUUID(),
      role: 'director',
      phoneNumber: '0555 888888',
      isVerified: true,
    },
  );

  // Создаем массив пользователей
  const users = Array.from({ length: 300 }, (_, index) => ({
    email: `user${index + 1}@gmail.com`,
    firstName: `User${index + 1}`,
    lastName: 'Userovich',
    password: '123',
    token: crypto.randomUUID(),
    role: 'user',
    phoneNumber: `0555 ${Math.floor(Math.random() * 100000000)}`,
    isVerified: true,
  }));

  // Создаем массив администраторов
  const admins = Array.from({ length: 50 }, (_, index) => ({
    email: `admin${index + 1}@gmail.com`,
    firstName: `Admin${index + 1}`,
    lastName: 'Adminich',
    password: '123',
    token: crypto.randomUUID(),
    role: 'admin',
    phoneNumber: `0555 ${Math.floor(Math.random() * 100000000)}`,
    isVerified: true,
  }));

  // Объединяем массивы пользователей и администраторов
  const usersAndAdmins = [...users, ...admins];

  // Создаем фикстурные данные в базе данных
  await User.create(usersAndAdmins);

  console.log('Фикстурные данные созданы:');

  const item = 50;

  for (let i = 0; i < item; i++) {
    await Order.create({
      user_id: user._id,
      createdAt: '2024-01-25T11:16:03.280Z',
      status: 'open',
      products: [
        {
          product: '57c55071-b0ad-11ec-812e-1831bfcbb43d',
          quantity: 1,
        },
      ],
      deliveryMethod: 'самовывоз',
      firstName: 'artem',
      lastName: 'Mark',
      phoneNumber: '+996 333 333 333',
      address: '',
      email: 'director@gmail.com',
      paymentMethod: 'наличные',
    });
  }

  await db.close();
};

run().catch(console.error);
