import mongoose from 'mongoose';
import config from './config';
import User from './models/User';

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    // await db.dropCollection('users');
    // await db.dropCollection('baskets');
    // await db.dropCollection('orders');
    // await db.dropCollection('chatidadmins');
    // await db.dropCollection('categories');
    // await db.dropCollection('products');
    console.log('delete products and categories');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  await User.create({
    email: 'admin@gmail.com',
    firstName: 'admin',
    lastName: 'admin',
    password: '123',
    token: crypto.randomUUID(),
    role: 'admin',
    phoneNumber: '0555 888888',
    isVerified: true,
  });

  await User.create({
    email: 'user@gmail.com',
    firstName: 'user',
    lastName: 'user',
    password: '123',
    token: crypto.randomUUID(),
    role: 'user',
    phoneNumber: '0555 888888',
    isVerified: true,
  });

  await User.create({
    email: 'director@gmail.com',
    firstName: 'director',
    lastName: 'director',
    password: '123',
    token: crypto.randomUUID(),
    role: 'director',
    phoneNumber: '0555 888888',
    isVerified: true,
  });

  await db.close();
};
run().catch(console.error);
