import express from 'express';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import { designerImageUpload, designerPdfUpload } from '../multer';
import DesignerDesc from '../models/DesignerDesc';
import DesignerGallery from '../models/DesignerGallery';
import path from 'path';
import config from '../config';
import fs from 'fs';
import DesignerPdf from '../models/DesignerPdf';
import { Request, Response, NextFunction } from 'express';

const designersRouter = express.Router();

designersRouter.post('/desc', auth, permit('admin'), async (req, res, next) => {
  try {
    const { title, desc } = req.body;

    const newDesc = new DesignerDesc({
      title,
      desc,
    });

    await newDesc.save();

    return res.send({
      message: {
        en: 'The section for designers has been successfully created!',
        ru: 'Раздел для дизайнеров успешно создан!',
      },
    });
  } catch (error) {
    return next(error);
  }
});

designersRouter.get('/desc', async (req, res, next) => {
  try {
    const desc = await DesignerDesc.find();
    res.send(desc);
  } catch (error) {
    next(error);
  }
});

designersRouter.delete('/desc/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const desc = await DesignerDesc.findById(req.params.id);

    if (!desc) {
      return res.status(404).send({
        message: {
          en: 'Description not found!',
          ru: 'Описание не найдено!',
        },
      });
    }

    await desc.deleteOne();

    return res.send({
      message: {
        en: 'The section for designers has been successfully removed!',
        ru: 'Раздел для дизайнеров успешно удален!',
      },
    });
  } catch (error) {
    next(error);
  }
});
// *****************************************************************
designersRouter.post('/gallery', auth, permit('admin'), designerImageUpload.single('image'), async (req, res, next) => {
  try {
    const { caption } = req.body;

    const imagePath = req.file ? `public/images/designers/${req.file.filename}` : '';

    const newGallery = new DesignerGallery({
      alt: caption,
      caption,
      image: imagePath,
    });

    await newGallery.save();

    return res.send({
      message: {
        en: 'The picture has been successfully added to the gallery!',
        ru: 'Картинка успешно добавлена в галерею!',
      },
    });
  } catch (error) {
    return next(error);
  }
});

designersRouter.get('/gallery', async (req, res, next) => {
  try {
    const gallery = await DesignerGallery.find();
    res.send(gallery);
  } catch (error) {
    next(error);
  }
});

designersRouter.delete('/gallery/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const gallery = await DesignerGallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).send({
        message: {
          en: 'Image not found!',
          ru: 'Картинка не найдена!',
        },
      });
    }

    // Удаляем связанный файл изображения
    const imagePath = path.join(config.publicPath, gallery.image);
    fs.unlinkSync(imagePath);

    // Удаляем баннер из базы данных
    await gallery.deleteOne();

    return res.send({
      message: {
        en: 'The image was successfully deleted!',
        ru: 'Картинка успешно удалена!',
      },
    });
  } catch (error) {
    next(error);
  }
});
// ***********************************************************************
designersRouter.post(
  '/pdf',
  designerPdfUpload.fields([
    { name: 'img', maxCount: 1 },
    { name: 'pdf', maxCount: 1 },
  ]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title } = req.body;
      const imgFile =
        req.files &&
        (
          req.files as {
            [fieldname: string]: Express.Multer.File[];
          }
        )['img']
          ? (req.files as { [fieldname: string]: Express.Multer.File[] })['img'][0]
          : null;
      const pdfFile =
        req.files &&
        (
          req.files as {
            [fieldname: string]: Express.Multer.File[];
          }
        )['pdf']
          ? (req.files as { [fieldname: string]: Express.Multer.File[] })['pdf'][0]
          : null;

      const imgPath = imgFile ? `public/images/designers/${imgFile.filename}` : '';
      const pdfPath = pdfFile ? `public/images/designers/${pdfFile.filename}` : '';

      const newPdf = new DesignerPdf({
        title,
        img: imgPath,
        pdf: pdfPath,
      });

      await newPdf.save();

      res.send({
        message: {
          en: 'Collection card created!',
          ru: 'Карточка коллекции создана!',
        },
      });
    } catch (error) {
      next(error);
    }
  },
);

designersRouter.get('/pdf', async (req, res, next) => {
  try {
    const pdf = await DesignerPdf.find();
    res.send(pdf);
  } catch (error) {
    next(error);
  }
});

designersRouter.delete('/pdf/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const pdf = await DesignerPdf.findById(req.params.id);

    if (!pdf) {
      return res.status(404).send({
        message: {
          en: 'Directory not found!',
          ru: 'Каталог не найден!',
        },
      });
    }

    const imagePath = path.join(config.publicPath, pdf.img);
    const pdfPath = path.join(config.publicPath, pdf.pdf);
    fs.unlinkSync(imagePath);
    fs.unlinkSync(pdfPath);

    await pdf.deleteOne();

    return res.send({
      message: {
        en: 'Directory deleted!',
        ru: 'Каталог удален!',
      },
    });
  } catch (error) {
    next(error);
  }
});

export default designersRouter;
