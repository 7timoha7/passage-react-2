import mongoose from 'mongoose';
import config from './config';

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
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  // await User.create({
  //   email: '7timoha7@mail.ru',
  //   firstName: 'tima',
  //   lastName: 'tima',
  //   password: '123',
  //   token: crypto.randomUUID(),
  //   role: 'admin',
  //   phoneNumber: '0555 888888',
  //   isVerified: true,
  // });

  await db.close();
};
run().catch(console.error);
