import path from 'path';
import * as dotenv from 'dotenv';

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';

dotenv.config({ path: envFile });

const rootPath = __dirname;

const config = {
  port: parseInt(process.env.PORT || '8000'),
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: process.env.MONGO_DB || 'mongodb://159.223.17.104/passage',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : '',
  },
  mail: 'artem77timoha77@gmail.com',
  site: process.env.WEBSITE_ADDRESS ? process.env.WEBSITE_ADDRESS : 'http://localhost:3000',
};

export default config;
