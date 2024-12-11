import mongoose from 'mongoose';
import { IDiscount } from '../types';

const Schema = mongoose.Schema;

const DiscountSchema = new Schema<IDiscount>({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  created_date: {
    type: String,
    required: true,
    default: new Date().toISOString(),
  },
});

const Discount = mongoose.model('Discount', DiscountSchema);
export default Discount;
