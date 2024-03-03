import mongoose from 'mongoose';
import config from './config';
import crypto from 'crypto';
import User from './models/User';
import axios from 'axios';
import {
  ICategoryFromApi,
  IProductFromApi,
  IProductPriceFromApi,
  IProductQuantityFromApi,
  IProductQuantityStocksFromApi,
} from './types';
import path from 'path';
import fs from 'fs';
import Product from './models/Product';
import Category from './models/Category';

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

  await db.close();
};
run().catch(console.error);
