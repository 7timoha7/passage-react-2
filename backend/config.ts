import path from 'path';
import * as dotenv from 'dotenv';

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';

dotenv.config({ path: envFile });

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: process.env.MONGO_DB || 'mongodb://localhost/shop',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : '',
  },
  mail: 'passagerakcaramics@gmail.com',
  site: process.env.WEBSITE_ADDRESS ? process.env.WEBSITE_ADDRESS : 'https://passage.kg',
  // site: process.env.WEBSITE_ADDRESS ? process.env.WEBSITE_ADDRESS : 'http://passage.go.kg',

};

export default config;
