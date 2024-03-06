import mongoose from 'mongoose';
import config from './config';
import crypto from 'crypto';
import User from './models/User';
import axios from 'axios';

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('baskets');
    await db.dropCollection('orders');
    await db.dropCollection('chatidadmins');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  await User.create({
    email: 'director@gmail.com',
    firstName: 'Director',
    lastName: 'Directorovich',
    password: '123',
    token: crypto.randomUUID(),
    role: 'director',
    phoneNumber: '0555 888888',
    isVerified: true,
  });

  const fetchData = async (method: string) => {
    const apiUrl = 'https://212.112.98.42/a/edoc/hs/ext_api/execute';
    const username = 'AUTH_TOKEN';
    const password = 'jU5gujas';

    try {
      const response = await axios.post(
        apiUrl,
        {
          auth: {
            clientID: '422ba5da-2560-11ee-8135-005056b73475',
          },
          general: {
            method,
            deviceID: '00000001-0001-0001-0001-000000015941',
          },
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${username}:${password}`, 'utf-8').toString('base64')}`,
            configName: 'AUTHORIZATION',
            configVersion: 'Basic Auth',
          },
        },
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ETIMEDOUT') {
          console.error('Превышен таймаут при выполнении запроса:', error);
        } else {
          console.error('Ошибка при выполнении запроса:', error.message, error.response?.data);
        }
      } else {
        console.error('Не удалось выполнить запрос:', error);
      }
      throw error;
    }
  };

  const responseProducts = await fetchData('goods-get');

  console.log(responseProducts);

  await db.close();
};
run().catch(console.error);
