import React from 'react';
import { Paper, Grid, Typography, Divider } from '@mui/material';
import { BasketTypeOnServerMutation } from '../../../types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { apiURL, placeHolderImg } from '../../../constants';
import noImg from '../../../assets/images/no_image.jpg';

interface Props {
  basket: BasketTypeOnServerMutation;
}

const ProductTable: React.FC<Props> = ({ basket }) => {
  const calculateSquareAreaInSquareMeters = (sizeString: string): number => {
    // Проверяем, содержит ли строка символ '*'
    if (sizeString.includes('*')) {
      const [lengthStr, widthStr] = sizeString.split('*');
      const lengthInCentimeters: number = parseInt(lengthStr);
      const widthInCentimeters: number = parseInt(widthStr);
      return (lengthInCentimeters * widthInCentimeters) / (100 * 100);
    } else {
      // Предполагаем, что пришли размеры в метрах
      // Площадь квадрата вычисляется как сторона в квадрате
      return parseFloat(sizeString);
    }
  };

  const textMeters = (quantity: number, metersOne: number) => {
    return (quantity * metersOne).toFixed(2);
  };
  return (
    <Paper style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Товары в корзине
      </Typography>
      {basket.items.map((product, index) => (
        <div
          key={`${product._id}-${index}`}
          style={{
            marginBottom: '20px',
            borderBottom: index !== basket.items.length - 1 ? '1px solid black' : 'none',
            paddingBottom: '15px',
          }}
        >
          <Grid container spacing={1} flexDirection={'column'}>
            <Grid item>
              <LazyLoadImage
                src={product.product.images[0] ? apiURL + '/' + product.product.images[0] : noImg}
                alt={product.product.name}
                width="40px"
                height="40px"
                style={{ objectFit: 'contain' }}
                placeholderSrc={placeHolderImg}
                effect="blur"
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" gutterBottom>
                Наименование: <span style={{ fontWeight: 'bold' }}>{product.product.name}</span>
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">Количество: {product.quantity}</Typography>
              {product.product.size && (
                <Typography variant="body1">
                  М²: {textMeters(product.quantity, calculateSquareAreaInSquareMeters(product.product.size))}
                </Typography>
              )}
            </Grid>
            {product.quantityToOrder > 0 && (
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" pb={0}>
                  Количество под заказ: {product.quantityToOrder}
                  <br />
                  <span style={{ fontSize: '10px', color: 'red' }}>Рассчитывается отдельно</span>
                </Typography>
              </Grid>
            )}
          </Grid>
          <Typography variant="body1">Сумма: {(product.product.price * product.quantity).toFixed(2)} сом</Typography>
        </div>
      ))}
      <Divider />
      <Typography variant="h6" gutterBottom>
        Итоговая стоимость: {basket.totalPrice.toFixed(2)} сом
      </Typography>
    </Paper>
  );
};

export default ProductTable;
