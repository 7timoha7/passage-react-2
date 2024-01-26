import React from 'react';
import OrderItem from './OrderItem';
import { Typography } from '@mui/material';

import { useAppSelector } from '../../../app/hooks';

import Spinner from '../../../components/UI/Spinner/Spinner';
import { OrderFromServerType } from '../../../types';
import { selectFetchOrdersForAdminLoading, selectFetchOrdersLoading } from '../orderSlice';

interface Props {
  ordersItems: OrderFromServerType[];
}

const OrderItems: React.FC<Props> = ({ ordersItems }) => {
  const ordersLoading = useAppSelector(selectFetchOrdersLoading);
  const ordersLoadingForAdmin = useAppSelector(selectFetchOrdersForAdminLoading);
  return (
    <>
      {ordersLoading || ordersLoadingForAdmin ? <Spinner /> : null}
      {ordersItems.length > 0 ? (
        ordersItems.map((item) => <OrderItem key={item._id} prop={item} />)
      ) : (
        <Typography>{'Заказов ещё нет'}</Typography>
      )}
    </>
  );
};

export default OrderItems;
