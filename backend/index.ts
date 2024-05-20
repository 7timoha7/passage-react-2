import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import usersRouter from './routers/users';
import path from 'path';
import categoryRouter from './routers/categories';
import productRouter from './routers/products';
import productFromApiRouter from './routers/productsFromApi';
import basketRouter from './routers/baskets';
import ordersRouter from './routers/orders';
import chatIdAdminRouter from './routers/chatIdAdmins';
import bestsellerRouter from './routers/bestsellers';
import bannersRouter from './routers/banners';
import productsForRouter from './routers/productsFor';
import https from 'https';
import fs from 'fs';

const app = express();
const port = 443; // Порт HTTPS сервера

// Загрузка SSL-сертификата и закрытого ключа
const privateKey = fs.readFileSync('/etc/ssl/certs/server.key', 'utf8');
const certificate = fs.readFileSync('/etc/ssl/certs/server.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const staticFilesPath = path.join(__dirname, 'public');
app.use(cors());
app.use(express.static(staticFilesPath));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: ['http://passage.go.kg/', 'https://passage.go.kg/'],
  }),
);
app.use('/users', usersRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/productsFromApi', productFromApiRouter);
app.use('/basket', basketRouter);
app.use('/orders', ordersRouter);
app.use('/chatIdAdmins', chatIdAdminRouter);
app.use('/bestsellers', bestsellerRouter);
app.use('/banners', bannersRouter);
app.use('/productsFor', productsForRouter);

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);

  // Создание HTTPS сервера с передачей SSL-сертификата и закрытого ключа
  const httpsServer = https.createServer(credentials, app);

  // Запуск HTTPS сервера
  httpsServer.listen(port, () => {
    console.log('We are live on ' + port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
