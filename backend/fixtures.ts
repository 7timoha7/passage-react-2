import mongoose from 'mongoose';
import config from './config';
import crypto from 'crypto';
import User from './models/User';

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    // await db.dropCollection('categories');
    // await db.dropCollection('products');
    await db.dropCollection('baskets');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  await User.create(
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

  await db.close();
};

run().catch(console.error);
