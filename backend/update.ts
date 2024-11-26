import mongoose from 'mongoose';
import config from './config';
import axios from 'axios';
import {
  ICategoryFromApi,
  IProductFromApi,
  IProductPriceFromApi,
  IProductPriceNameFromApi,
  IProductQuantityFromApi,
  IProductQuantityStocksFromApi,
} from './types';
import path from 'path';
import fs from 'fs';
import Product from './models/Product';
import Category from './models/Category';
import User from './models/User';
import Order from './models/Order';
import Basket from './models/Basket';
import Bestseller from './models/Bestseller';
import ProductFor from './models/ProductFor';

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

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
  const processDescription = (
    description: string,
  ): {
    size: string;
    thickness: string;
    description: string;
    type: string;
    quantity?: string;
  } => {
    // Разделяем строку по разделителю "\\" и удаляем пробелы
    const parts = description.split('\\\\').map((part) => part.trim());

    // Если разделители присутствуют, используем их для определения size, thickness и description
    if (parts.length > 1) {
      // Если первая часть строки точно соответствует "Ковролин\\"
      if (parts[0] === 'Ковролин') {
        return {
          size: parts[1] || '', // size
          thickness: '', // Для Ковролина толщина не указывается
          description: parts.slice(2).join('\\\\') || '', // description
          type: 'Ковролин',
        };
      }
      // Если первая часть строки точно соответствует "Ламинат\\"
      else if (parts[0] === 'Ламинат') {
        return {
          size: parts[1] || '', // size
          thickness: parts[2] || '', // thickness
          quantity: parts[3] || '', //количество в шт
          description: parts.slice(4).join('\\\\') || '', // description
          type: 'Ламинат',
        };
      }
      // Если нет указания на тип покрытия, то это для плитки керамогранита
      else {
        return {
          size: parts[0] || '', // Если size не указан, установите пустую строку
          thickness: parts[1] || '', // Если thickness не указан, установите пустую строку
          description: parts.slice(2).join('\\\\') || '', // Используем оставшуюся часть как description
          type: 'Керамогранит',
        };
      }
    }
    // Если разделители отсутствуют, считаем, что описание относится к керамограниту
    else {
      return {
        size: '', // пусто
        thickness: '', // пусто
        description: description, // весь текст как description
        type: '',
      };
    }
  };

  // Функция для расчета площади на основе размера
  const calculateArea = (size: string, type: string): number => {
    let width: number, height: number;

    // Проверяем, является ли входная строка числом или числом с запятой
    if (type === 'Ковролин') {
      // Если да, устанавливаем ширину равной этому числу, а высоту равной 1
      width = parseFloat(size.replace(',', '.')); // Заменяем запятую на точку и преобразуем в число
      height = 1;
      return width * height;
    } else {
      // Иначе разбираем размер на ширину и высоту, как было раньше
      [width, height] = size
        .replace(/,/g, '.') // Заменяем запятые на точки для правильного преобразования в число
        .split(/[*xXхХ]/)
        .map(Number);
      return (width * height) / 10000; // Переводим из см² в м²
    }
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

      // Фильтруем объекты по наличию имени 'РРЦ'
      const filteredPrices: IProductPriceFromApi[] = prices.filter((price) => {
        // Проверяем, есть ли в массиве pricesName объект с именем 'РРЦ' и с тем же typeID
        return pricesName.some((pn) => pn.name === 'РРЦ' && pn.typeID === price.typeID);
      });

      const filteredPricesSale: IProductPriceFromApi[] = prices.filter((price) => {
        // Проверяем, есть ли в массиве pricesName объект с именем 'Оптовая цена' и с тем же typeID
        return pricesName.some((pn) => pn.name === 'Оптовая цена' && pn.typeID === price.typeID);
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

        // Проверяем, есть ли остатки только на складе 'Склад материалов (не для продажи)'
        const hasOnlyExcludedWarehouseStock = quantityDataArray.every((q) => {
          const stock = quantitiesStocks.find((qs) => qs.stockID === q.stockID);
          return stock && stock.name === 'Склад материалов (не для продажи)';
        });

        if (hasOnlyExcludedWarehouseStock) {
          // Пропускаем продукт, если он есть только на исключенном складе
          continue;
        }

        // Фильтруем остатки, чтобы не учитывать склады с именем 'Склад материалов (не для продажи)'
        const validQuantityDataArray = quantityDataArray.filter((q) => {
          const stock = quantitiesStocks.find((qs) => qs.stockID === q.stockID);
          return (
            stock &&
            stock.name !== 'Склад материалов (не для продажи)' &&
            stock.name !== 'Склад БРАКА' &&
            q.quantity > 0
          );
        });

        // Проверяем, есть ли положительные остатки на других складах
        if (validQuantityDataArray.length === 0) {
          continue;
        }

        // Получаем данные о цене для текущего продукта
        const priceData = filteredPrices.find((p) => p.goodID === productData.goodID);
        if (!priceData || !priceData.price) {
          // Пропускаем продукты без цены
          continue;
        }

        // ### Добавляем получение данных о распродажной цене
        const priceSaleData = filteredPricesSale.find((p) => p.goodID === productData.goodID);

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
          productImages.push(path.join('/images/imagesProduct', productData.goodID, mainImageName));
        }
        if (productData.imagesBase64 && productData.imagesBase64.length > 0) {
          productData.imagesBase64.forEach((imageBase64, index) => {
            const imageName = `image${index + 1}.jpg`;
            const imagePath = path.join(imageFolder, imageName);
            fs.writeFileSync(imagePath, imageBase64, 'base64');
            productImages.push(path.join('/images/imagesProduct', productData.goodID, imageName));
          });
        }

        // Обрабатываем размеры и описание товара
        const { size, thickness, description, type } = processDescription(productData.description);

        // Пересчитываем цену, если это необходимо
        let recalculatedPrice = priceData.price;
        if (
          productData.measureName &&
          (productData.measureName.toLowerCase() === 'м2' || productData.measureName.toLowerCase() === 'm2') &&
          size
        ) {
          const area = calculateArea(size, type);
          recalculatedPrice = calculatePricePerSquareMeter(priceData.price, area);
        }

        // Проверяем, является ли цена числом перед сохранением
        if (isNaN(recalculatedPrice)) {
          continue; // Пропускаем продукт и переходим к следующему
        }

        // ### Добавляем пересчет распродажной цены, если необходимо
        let recalculatedSalePrice = priceSaleData ? priceSaleData.price : 0;
        if (
          priceSaleData &&
          productData.measureName &&
          (productData.measureName.toLowerCase() === 'м2' || productData.measureName.toLowerCase() === 'm2') &&
          size
        ) {
          const area = calculateArea(size, type);
          recalculatedSalePrice = calculatePricePerSquareMeter(priceSaleData.price, area);
        }

        // ### Проверяем, является ли распродажная цена числом перед сохранением
        if (priceSaleData && isNaN(recalculatedSalePrice)) {
          recalculatedSalePrice = 0; // Если распродажная цена не является числом, сбрасываем ее в 0
        }

        // ### Добавляем функцию проверки, является ли категория распродажной или подкатегорией распродажи
        const isSaleCategory = (categoryId: string): boolean => {
          const category = categoriesData.find((c) => c.ID === categoryId);
          if (!category) return false;
          if (category.name === 'РАСПРОДАЖА') return true;
          return category.ownerID ? isSaleCategory(category.ownerID) : false;
        };

        // ### Обновляем логику формирования цены
        let productPrice = recalculatedPrice;
        let productOriginalPrice = priceData.price;
        let productSalePrice = 0;
        let productOriginalSalePrice = 0;

        if (isSaleCategory(productWithCategory.ID) && priceSaleData) {
          productSalePrice = productPrice;
          productOriginalSalePrice = productOriginalPrice;
          productPrice = recalculatedSalePrice;
          productOriginalPrice = priceSaleData.price;
        }

        // Формируем объект продукта
        const product = new Product({
          name: productData.name,
          article: productData.article,
          goodID: productData.goodID,
          measureCode: productData.measureCode,
          measureName: productData.measureName,
          ownerID: productData.ownerID,
          quantity: validQuantityDataArray.map((quantityData) => {
            const stock = quantitiesStocks.find((qs) => qs.stockID === quantityData.stockID);
            return {
              name: stock ? stock.name : '', // Записываем название склада, если найдено, иначе пустая строка
              stockID: quantityData.stockID,
              quantity: quantityData.quantity,
            };
          }),
          price: productPrice, // Используем пересчитанную цену
          priceOriginal: productOriginalPrice,
          priceSale: productSalePrice, // ### Добавляем поле распродажной цены
          priceOriginalSale: productOriginalSalePrice, // ### Добавляем поле оригинальной распродажной цены
          images: productImages,
          size,
          thickness,
          description,
          originCountry: productData.originCountry,
          type: type ? type : '',
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

  ////////////////////////
  const cleanUpDatabase = async () => {
    // Получаем список всех существующих товаров
    const existingProducts = new Set((await Product.find({}, { goodID: 1 })).map((product) => product.goodID));

    // Обработка пользователей
    const users = await User.find({});
    await Promise.all(
      users.map(async (user) => {
        user.favorites = user.favorites.filter((productId) => existingProducts.has(productId));
        await user.save();
      }),
    );

    // Обработка заказов
    const orders = await Order.find({});
    await Promise.all(
      orders.map(async (order) => {
        order.products = order.products.filter((item) => existingProducts.has(item.product));
        if (order.products.length === 0) {
          await Order.deleteOne({ _id: order._id });
        } else {
          await order.save();
        }
      }),
    );

    // Обработка корзин
    const baskets = await Basket.find({});
    await Promise.all(
      baskets.map(async (basket) => {
        basket.items = basket.items.filter((item) => existingProducts.has(item.product));
        await basket.save();
      }),
    );

    // Обработка бестселлеров
    await Bestseller.deleteMany({ bestseller_id: { $nin: Array.from(existingProducts) } });

    // Получаем список всех существующих категорий
    const existingCategories = new Set((await Category.find({}, { ID: 1 })).map((category) => category.ID));

    // Обработка записей ProductFor
    const productFors = await ProductFor.find({});
    await Promise.all(
      productFors.map(async (productFor) => {
        if (!existingCategories.has(productFor.categoryID)) {
          await ProductFor.deleteOne({ _id: productFor._id });
          return;
        }

        productFor.categoryForID = productFor.categoryForID.filter((categoryID) => existingCategories.has(categoryID));

        await productFor.save();
      }),
    );
  };
  ////////////////////////

  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);

  console.log('start - loading data...');
  const responseProducts = await fetchData('goods-get');
  const responseQuantity = await fetchData('goods-quantity-get');
  const responsePrice = await fetchData('goods-price-get');

  const products: IProductFromApi[] = responseProducts.result.goods;
  const quantity = responseQuantity.result;
  const quantityGoods: IProductQuantityFromApi[] = quantity.goods;
  const quantityStocks: IProductQuantityStocksFromApi[] = quantity.stocks;
  const price: IProductPriceFromApi[] = responsePrice.result.goods;
  const priceName: IProductPriceNameFromApi[] = responsePrice.result.typesPrices;
  const categories: ICategoryFromApi[] = responseProducts.result.goodsGroups;
  console.log('finish - loading data...');

  try {
    console.log('start Delete collection');
    await deleteFolderImagerProduct();
    await db.dropCollection('categories');
    await db.dropCollection('products');
    console.log('finish Delete collection');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  await createProducts(products, price, priceName, quantityGoods, quantityStocks, categories);
  await createCategories(categories);
  await cleanUpDatabase();

  console.log('loading --- TRUE ! ! ! ');

  await db.close();
};
run().catch(console.error);
