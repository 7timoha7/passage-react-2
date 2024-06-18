import mongoose from 'mongoose';
import { IDesignerGallery } from '../types';

const Schema = mongoose.Schema;

const DesignerGallerySchema = new Schema<IDesignerGallery>({
  alt: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const DesignerGallery = mongoose.model('DesignerGallery', DesignerGallerySchema);
export default DesignerGallery;
