import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAllDiscounts, selectFetchDiscountsLoading } from '../discountsSlice';
import { fetchAllDiscounts } from '../disccountsThunks';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { btnUserItemColor } from '../../../styles';
import { Box, Button, Typography } from '@mui/material';

const DownloadDiscounts = () => {
  const discountsAll = useAppSelector(selectAllDiscounts);
  const loading = useAppSelector(selectFetchDiscountsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllDiscounts());
  }, [dispatch]);

  // Функция экспорта в Excel
  const exportToExcel = () => {
    if (!discountsAll.length) {
      alert('Нет данных для скачивания!');
      return;
    }

    // Сортируем по дате (новые сверху)
    const sortedData = [...discountsAll].sort(
      (a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime(),
    );

    // Форматируем данные
    const formattedData = sortedData.map((discount) => ({
      Имя: discount.name,
      'Номер телефона': discount.phone,
      Источник: discount.source,
      'Дата создания': new Date(discount.created_date).toLocaleString(),
    }));

    // Создаем лист Excel
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Автоширина колонок
    worksheet['!cols'] = Object.keys(formattedData[0]).map((key) => ({
      wch: key === 'Источник' ? 60 : Math.max(20, key.length + 5), // "Источник" шире
    }));

    // Создаем книгу Excel
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Discounts');

    // Генерируем Excel-файл
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Создаем Blob и скачиваем
    const fileData = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(fileData, 'list-of-discounts.xlsx');
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={3}>
      {loading ? (
        <Spinner />
      ) : discountsAll.length === 0 ? (
        <>
          <Typography variant="h6" color="textSecondary">
            Список пуст
          </Typography>
          <Button variant="outlined" sx={{ btnUserItemColor, mt: 2 }} disabled>
            Скачать полный список
          </Button>
        </>
      ) : (
        <Button onClick={exportToExcel} variant="outlined" sx={btnUserItemColor} disabled={loading}>
          Скачать полный список
        </Button>
      )}
    </Box>
  );
};

export default DownloadDiscounts;
