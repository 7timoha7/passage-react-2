import mongoose from 'mongoose';
import { IDesignerPdf } from '../types';

const Schema = mongoose.Schema;

const DesignerPdfSchema = new Schema<IDesignerPdf>({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  pdf: {
    type: String,
    required: true,
  },
});

const DesignerPdf = mongoose.model('DesignerPdf', DesignerPdfSchema);
export default DesignerPdf;
