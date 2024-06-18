import mongoose from 'mongoose';
import { IDesignerDesc } from '../types';

const Schema = mongoose.Schema;

const DesignerDescSchema = new Schema<IDesignerDesc>({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

const DesignerDesc = mongoose.model('DesignerDesc', DesignerDescSchema);
export default DesignerDesc;
