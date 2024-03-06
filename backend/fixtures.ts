import mongoose from 'mongoose';
import config from './config';
import crypto from 'crypto';
import User from './models/User';
import * as http from 'http';
import * as https from 'https';

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

  interface AuthData {
    clientID: string;
  }

  interface GeneralData {
    method: string;
    deviceID: string;
  }

  interface RequestData {
    auth: AuthData;
    general: GeneralData;
  }

  // Здесь вам нужно заменить any на реальный тип данных, которые возвращает ваш запрос
  interface ResponseData {
    // Замените any на реальные типы данных
  }

  const fetchData = async (method: string): Promise<ResponseData> => {
    const apiUrl = 'https://fresh-test.1c-cloud.kg/a/edoc/hs/ext_api/execute';
    const username = 'AUTH_TOKEN';
    const password = 'jU5gujas';

    const requestOptions: http.RequestOptions = {
      hostname: 'fresh-test.1c-cloud.kg',
      port: 443,
      path: '/a/edoc/hs/ext_api/execute',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${username}:${password}`, 'utf-8').toString('base64')}`,
        configName: 'AUTHORIZATION',
        configVersion: 'Basic Auth',
      },
      timeout: 600000, // Увеличьте значение таймаута по необходимости
    };

    const postData: RequestData = {
      auth: {
        clientID: '422ba5da-2560-11ee-8135-005056b73475',
      },
      general: {
        method,
        deviceID: '00000001-0001-0001-0001-000000015941',
      },
    };

    return new Promise((resolve, reject) => {
      const protocol = apiUrl.startsWith('https') ? https : http;

      const req = protocol.request(requestOptions, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve(JSON.parse(data));
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(JSON.stringify(postData));
      req.end();
    });
  };

  const responseProducts = await fetchData('goods-get');

  console.log(responseProducts);

  await db.close();
};
run().catch(console.error);
