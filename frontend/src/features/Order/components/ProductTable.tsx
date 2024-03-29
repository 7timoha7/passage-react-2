import React from 'react';
import { Paper, Grid, Typography, Divider } from '@mui/material';
import { BasketTypeOnServerMutation } from '../../../types';

interface Props {
  basket: BasketTypeOnServerMutation;
}

const ProductTable: React.FC<Props> = ({ basket }) => {
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
          <Typography variant="body1" gutterBottom>
            Название товара: {product.product.name}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">Количество: {product.quantity}</Typography>
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
          <Typography variant="body1">Сумма: {product.product.price * product.quantity} сом</Typography>
        </div>
      ))}
      <Divider />
      <Typography variant="h6" gutterBottom>
        Итоговая стоимость: {basket.totalPrice} сом
      </Typography>
    </Paper>
  );
};

export default ProductTable;
