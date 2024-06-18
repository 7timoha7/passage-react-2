import mongoose from 'mongoose';
import { IBanner } from '../types';

const Schema = mongoose.Schema;

const BannerSchema = new Schema<IBanner>({
  typeBanner: {
    type: String,
    required: true,
    enum: ['top', 'middle', 'bottom'],
  },
  title: {
    type: String,
  },
  desk: {
    type: String,
  },
  link: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
});

const Banner = mongoose.model('Banner', BannerSchema);
export default Banner;
