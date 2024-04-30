import express from 'express';
import {
  ICategoryFromApi,
  IProductFromApi,
  IProductPriceFromApi,
  IProductPriceNameFromApi,
  IProductQuantityFromApi,
  IProductQuantityStocksFromApi,
} from '../types';
import path from 'path';
import * as fs from 'fs';
import Product from '../models/Product';
import Category from '../models/Category';
import mongoose from 'mongoose';
import config from '../config';
import axios from 'axios';

const productFromApiRouter = express.Router();

const fetchData = async (method: string) => {
  const apiUrl = 'http://95.215.244.110/edo/hs/ext_api/execute';
  const username = 'AUTH_TOKEN';
  const password = 'jU5gujas';

  try {
    const response = await axios.post(
      apiUrl,
      {
        auth: {
          clientID: 'c02c593e-4c90-11ee-813c-005056b73475',
        },
        general: {
          method,
          deviceID: '00000001-0001-0001-0001-000000015945',
        },
      },
      {
        timeout: 300000,
        headers: {
          Authorization: `Basic ${Buffer.from(`${username}:${password}`, 'utf-8').toString('base64')}`,
          configName: 'AUTHORIZATION',
          configVersion: 'Basic Auth',
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ETIMEDOUT') {
        console.error('Превышен таймаут при выполнении запроса:', error);
      } else {
        console.error('Ошибка при выполнении запроса:', error.message, error.response?.data);
      }
    } else {
      console.error('Не удалось выполнить запрос:', error);
    }
    throw error;
  }
};

// Функция для обработки строки description и извлечения размера, толщины и описания
const processDescription = (description: string): { size: string; thickness: string; description: string } => {
  const parts = description.split('\\\\').map((part) => part.trim());

  if (parts.length > 1) {
    return {
      size: parts[0] || '', // Если size не указан, установите пустую строку
      thickness: parts[1] || '', // Если thickness не указан, установите пустую строку
      description: parts.slice(2).join('\\\\') || '', // Используем оставшуюся часть как description
    };
  } else {
    return {
      size: '', // Разделители отсутствуют, size пуст
      thickness: '', // Разделители отсутствуют, thickness пуст
      description: parts[0] || '', // Используем весь текст как description
    };
  }
};

// Функция для расчета площади на основе размера
const calculateArea = (size: string): number => {
  const [width, height] = size
    .replace(/,/g, '.') // Заменяем запятые на точки для правильного преобразования в число
    .split(/[*xXхХ]/)
    .map(Number);
  return (width * height) / 10000; // Переводим из см² в м²
};

// Функция для пересчета цены на квадратный метр
const calculatePricePerSquareMeter = (price: number, area: number): number => {
  const totalPrice = price * area; // Вычисляем общую цену
  return Number(totalPrice.toFixed(2)); // Округляем до двух знаков после запятой и преобразуем обратно в число
};

const createProducts = async (
  products: IProductFromApi[],
  prices: IProductPriceFromApi[],
  pricesName: IProductPriceNameFromApi[],
  quantities: IProductQuantityFromApi[],
  quantitiesStocks: IProductQuantityStocksFromApi[],
  categoriesData: ICategoryFromApi[],
): Promise<void> => {
  try {
    const updatedProducts = [];

    // Фильтруем объекты по условию typeID и наличия имени 'РРЦ'
    const filteredPrices: IProductPriceFromApi[] = prices.filter((price) => {
      // Проверяем совпадение по typeID
      const matchingTypeID = pricesName.find((pn) => pn.typeID === price.typeID);
      // Если есть совпадение по typeID и в pricesName есть объект с именем 'РРЦ', то возвращаем true
      return matchingTypeID && pricesName.some((pn) => pn.name === 'РРЦ');
    });

    for (const productData of products) {
      // Получаем массив данных о количестве товаров по goodID текущего продукта
      const quantityDataArray = quantities.filter((q) => q.goodID === productData.goodID);

      // Проверяем наличие артикула и положительного количества товара
      if (
        !productData.article || // Если нет артикула
        quantityDataArray.length === 0 || // или отсутствуют данные о количестве
        !quantityDataArray.some((q) => q.quantity > 0)
      ) {
        // или нет положительного количества товара
        // Пропускаем текущий продукт и переходим к следующему
        continue;
      }

      // Получаем данные о цене для текущего продукта
      const priceData = filteredPrices.find((p) => p.goodID === productData.goodID);
      if (!priceData || !priceData.price) {
        // Пропускаем продукты без цены
        continue;
      }

      // Проверка на то есть ли у товара категория ?
      const productWithCategory = categoriesData.find((p) => p.ID === productData.ownerID);
      if (!productWithCategory || !productWithCategory.ownerID) {
        // пропускаем если нет категории для товара
        continue;
      }

      // Создаем папку для изображений товара, если они есть
      const imageFolder = path.join(process.cwd(), 'public/images/imagesProduct', productData.goodID);
      if ((productData.imageBase64 || productData.imagesBase64.length > 0) && !fs.existsSync(imageFolder)) {
        fs.mkdirSync(imageFolder, { recursive: true });
      }

      // Обрабатываем изображения товара
      const productImages = [];
      if (productData.imageBase64) {
        const mainImageName = 'image_main.jpg';
        const mainImagePath = path.join(imageFolder, mainImageName);
        fs.writeFileSync(mainImagePath, productData.imageBase64, 'base64');
        productImages.push(path.join('public/images/imagesProduct', productData.goodID, mainImageName));
      }
      if (productData.imagesBase64 && productData.imagesBase64.length > 0) {
        productData.imagesBase64.forEach((imageBase64, index) => {
          const imageName = `image${index + 1}.jpg`;
          const imagePath = path.join(imageFolder, imageName);
          fs.writeFileSync(imagePath, imageBase64, 'base64');
          productImages.push(path.join('public/images/imagesProduct', productData.goodID, imageName));
        });
      }

      // Обрабатываем размеры и описание товара
      const { size, thickness, description } = processDescription(productData.description);

      // Пересчитываем цену, если это необходимо
      let recalculatedPrice = priceData.price;
      if (
        productData.measureName &&
        (productData.measureName.toLowerCase() === 'м2' || productData.measureName.toLowerCase() === 'm2') &&
        size
      ) {
        const area = calculateArea(size);
        // recalculatedPrice = calculatePricePerSquareMeter(priceData.price, Number(area.toFixed(2)));
        recalculatedPrice = calculatePricePerSquareMeter(priceData.price, area);
      }

      // Проверяем, является ли цена числом перед сохранением
      if (isNaN(recalculatedPrice)) {
        continue; // Пропускаем продукт и переходим к следующему
      }

      // Формируем объект продукта
      const product = new Product({
        name: productData.name,
        article: productData.article,
        goodID: productData.goodID,
        measureCode: productData.measureCode,
        measureName: productData.measureName,
        ownerID: productData.ownerID,
        quantity: quantityDataArray
          .filter((quantityData) => quantityData.quantity > 0) // Отфильтровать только элементы с положительным количеством
          .map((quantityData) => {
            const stock = quantitiesStocks.find((qs) => qs.stockID === quantityData.stockID);
            return {
              name: stock ? stock.name : '', // Записываем название склада, если найдено, иначе пустая строка
              stockID: quantityData.stockID,
              quantity: quantityData.quantity,
            };
          }),
        price: recalculatedPrice, // Используем пересчитанную цену
        images: productImages,
        size,
        thickness,
        description,
        originCountry: productData.originCountry,
      });

      // Сохраняем продукт в базу данных
      await product.save();
      updatedProducts.push(product);
    }

    // Обновляем изображения всех продуктов одним запросом к базе данных
    await Product.bulkWrite(
      updatedProducts.map((product) => ({
        updateOne: {
          filter: { _id: product._id },
          update: { $set: { images: product.images } },
        },
      })),
    );

    // Выводим сообщение об успешном завершении операции
    console.log('Товары успешно созданы и обновлены в базе данных.');
  } catch (error) {
    // Выводим сообщение об ошибке, если что-то пошло не так
    console.error('Ошибка при создании товаров:', error);
  }
};

const createCategories = async (categoriesData: ICategoryFromApi[]): Promise<void> => {
  try {
    // Шаг 1: Создаем категории, в которых есть товары
    for (const categoryData of categoriesData) {
      const productsForCategory = await Product.find({ ownerID: categoryData.ID });
      if (productsForCategory.length > 0) {
        const newCategory = new Category({
          name: categoryData.name,
          ID: categoryData.ID,
          ownerID: categoryData.ownerID,
          productsHave: true,
        });
        await newCategory.save();
      }
    }

    // Шаг 2: Создаем вышестоящие категории
    for (const categoryData of categoriesData) {
      // Находим родительскую категорию
      const ownerCategory = categoriesData.find((item) => item.ID === categoryData.ownerID);

      // Проверяем, есть ли такая родительская категория и создана ли она
      if (ownerCategory && !(await Category.exists({ ID: ownerCategory.ID }))) {
        const newCategory = new Category({
          name: ownerCategory.name,
          ID: ownerCategory.ID,
          ownerID: ownerCategory.ownerID,
        });
        await newCategory.save();
      }
    }

    console.log('Все категории успешно созданы в базе данных.');
  } catch (error) {
    console.error('Ошибка при создании категорий:', error);
  }
};

const deleteFolderImagerProduct = async () => {
  const imageFolder = path.join(process.cwd(), 'public/images/imagesProduct');

  // Удаление папки и её содержимого
  if (fs.existsSync(imageFolder)) {
    deleteFolderRecursive(imageFolder);
    console.log('Папка успешно удалена');
  } else {
    console.log('Папка не существует');
  }

  function deleteFolderRecursive(folderPath: string) {
    if (fs.existsSync(folderPath)) {
      fs.readdirSync(folderPath).forEach((file) => {
        const curPath = path.join(folderPath, file);
        if (fs.lstatSync(curPath).isDirectory()) {
          // Рекурсивно удалить подпапки
          deleteFolderRecursive(curPath);
        } else {
          // Удалить файл
          fs.unlinkSync(curPath);
        }
      });
      // Удалить саму папку
      fs.rmdirSync(folderPath);
    }
  }
};

productFromApiRouter.get('/', async (req, res, next) => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    console.log('loading...');
    await deleteFolderImagerProduct();
    await db.dropCollection('categories');
    await db.dropCollection('products');
    console.log('Delete collection');

    const responseProducts = await fetchData('goods-get');
    const responseQuantity = await fetchData('goods-quantity-get');
    const responsePrice = await fetchData('goods-price-get');

    // ////////////////////////////////////////////////////////
    // // Вместо ожидания результата запроса, сохраняем его в переменную
    // const goodsData = await fetchData('goods-get');
    //
    // // Путь к файлу
    // const directoryPath = path.join(__dirname, 'public'); // Примерный путь к папке, где должен быть сохранен файл
    // const directoryPath2 = path.join(__dirname, 'public'); // Примерный путь к папке, где должен быть сохранен файл
    // const filePath = path.join(directoryPath, 'goodsData.txt');
    // const filePath2 = path.join(directoryPath2, 'groupsData.txt');
    // const filePath3 = path.join(directoryPath2, 'priceData.txt');
    //
    // // Создаем отсутствующие папки, если они не существуют
    // fs.mkdirSync(directoryPath, { recursive: true });
    //
    // // Сохраняем данные в текстовый файл
    // fs.writeFileSync(filePath, JSON.stringify(goodsData.result.goods, null, 2), 'utf-8');
    // fs.writeFileSync(filePath2, JSON.stringify(goodsData.result.goodsGroups, null, 2), 'utf-8');
    // fs.writeFileSync(filePath3, JSON.stringify(responsePrice.result.goods, null, 2), 'utf-8');
    // /////////////////////////////////////////////////////////////////////

    const products: IProductFromApi[] = responseProducts.result.goods;

    const quantity = responseQuantity.result;
    const quantityGoods: IProductQuantityFromApi[] = quantity.goods;
    const quantityStocks: IProductQuantityStocksFromApi[] = quantity.stocks;

    const price: IProductPriceFromApi[] = responsePrice.result.goods;
    const priceName: IProductPriceNameFromApi[] = responsePrice.result.typesPrices;

    const categories: ICategoryFromApi[] = responseProducts.result.goodsGroups;

    await createProducts(products, price, priceName, quantityGoods, quantityStocks, categories);
    await createCategories(categories);

    // //////////////////////////
    // // Функция для поиска товаров, которые не принадлежат ни одной категории
    // const findProductsNotInCategories = async (products: IProductFromApi[], categories: ICategoryFromApi[]) => {
    //   const categoryIds = categories.map((category) => category.ID);
    //   const noProducts = products.filter((product) => !categoryIds.includes(product.ownerID));
    //   console.log(noProducts.length);
    //   return products.filter((product) => !categoryIds.includes(product.ownerID));
    // };
    //
    // const saveProductsToFile = (
    //   products: Array<{
    //     name: string;
    //     article: string;
    //     goodID: string;
    //     ownerID: string;
    //   }>,
    //   filePath: string,
    // ) => {
    //   const filteredProducts = products.map((product) => ({
    //     name: product.name,
    //     article: product.article,
    //     goodID: product.goodID,
    //     ownerID: product.ownerID,
    //   }));
    //
    //   const jsonContent = JSON.stringify(filteredProducts, null, 2);
    //
    //   fs.writeFile(filePath, jsonContent, 'utf8', (err) => {
    //     if (err) {
    //       console.error('Ошибка при записи в файл:', err);
    //       return;
    //     }
    //     console.log('Товары успешно сохранены в файл:', filePath);
    //   });
    // };
    //
    // findProductsNotInCategories(products, categories)
    //   .then((filteredProducts) => {
    //     const filePath = 'productsNotInCategories.json';
    //     saveProductsToFile(filteredProducts, filePath);
    //   })
    //   .catch((error) => {
    //     console.error('Ошибка:', error);
    //   });
    // //////////////////////////

    console.log('loadingTRUE ! ! ! ');

    return res.send({
      message: {
        en: 'Updating the database from "1C" was successful!',
        ru: 'Обновление базы данных с "1С" - прошло успешно !',
      },
    });
  } catch (e) {
    return next(e);
  }
});

export default productFromApiRouter;
