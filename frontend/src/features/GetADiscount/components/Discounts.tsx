import React, { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectDeleteDiscountLoading,
  selectDiscounts,
  selectFetchDiscountsLoading,
  selectPageInfo,
} from '../discountsSlice';
import { deleteDiscount, fetchDiscounts } from '../disccountsThunks';
import {
  Box,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  ThemeProvider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import { toolbarTobAndBottomColor } from '../../../styles';
import { debounce } from 'lodash';
import { themeDiscount } from '../../../theme';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { LoadingButton } from '@mui/lab';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1rem',
  backgroundColor: toolbarTobAndBottomColor,
  color: theme.palette.common.white,
}));

const Discounts = () => {
  const discounts = useAppSelector(selectDiscounts);
  const dispatch = useAppDispatch();
  const pageInfo = useAppSelector(selectPageInfo);
  const loading = useAppSelector(selectFetchDiscountsLoading);
  const deleteLoading = useAppSelector(selectDeleteDiscountLoading);

  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Мемоизированная функция для запроса данных
  const fetchDiscountsData = useCallback(
    (page: number, searchTerm: string) => {
      dispatch(fetchDiscounts({ page, search: searchTerm }));
    },
    [dispatch],
  );

  useEffect(() => {
    fetchDiscountsData(1, '');
  }, [fetchDiscountsData]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    fetchDiscountsData(page, search);
  };

  const debounceSearch = debounce((value: string) => {
    if (value.length >= 3) {
      setCurrentPage(1);
      fetchDiscountsData(1, value);
    }
  }, 500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);

    if (value.length < 3) {
      setCurrentPage(1);
      fetchDiscountsData(1, '');
    } else {
      debounceSearch(value);
    }
  };

  const handleClearSearch = () => {
    setSearch('');
    setCurrentPage(1);
    fetchDiscountsData(1, '');
  };

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const time = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    const formattedDate = date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return `${time}, ${formattedDate}`;
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteDiscount(id));

    if (pageInfo) {
      const isLastPage = pageInfo.totalItems % pageInfo.pageSize === 1;
      const newPage = isLastPage ? Math.max(1, pageInfo.currentPage - 1) : pageInfo.currentPage;
      await fetchDiscountsData(newPage, search);
    } else {
      await fetchDiscountsData(1, search);
    }
  };

  const renderPagination = () => {
    if (pageInfo && pageInfo.totalPages > 1) {
      return (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            showFirstButton
            showLastButton
            count={pageInfo.totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            size={'small'}
          />
        </Box>
      );
    }
    return null;
  };

  const renderTable = () => (
    <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Имя</StyledTableCell>
            <StyledTableCell>Номер телефона</StyledTableCell>
            <StyledTableCell>Источник</StyledTableCell>
            <StyledTableCell>Дата создания</StyledTableCell>
            <StyledTableCell>Удалить</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {discounts.map((discount) => (
            <TableRow key={discount._id} hover>
              <TableCell>{discount.name}</TableCell>
              <TableCell>{discount.phone}</TableCell>
              <TableCell>{discount.source}</TableCell>
              <TableCell>{formatDate(discount.created_date)}</TableCell>
              <TableCell>
                <LoadingButton
                  loading={deleteLoading === discount._id}
                  color="error"
                  onClick={() => handleDelete(discount._id)}
                  aria-label="удалить"
                >
                  <DeleteIcon />
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box p={4}>
      <Typography variant="h4" align="center" gutterBottom>
        Список Скидок
      </Typography>
      <ThemeProvider theme={themeDiscount}>
        <Box display="flex" justifyContent="center" mb={3}>
          <TextField
            label="Поиск"
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: search ? (
                <IconButton sx={{ p: 0.5 }} onClick={handleClearSearch} edge="end" aria-label="clear search">
                  <ClearIcon />
                </IconButton>
              ) : null,
            }}
            fullWidth
            size="small"
          />
        </Box>
      </ThemeProvider>
      {renderPagination()}
      {loading ? <Spinner /> : renderTable()}
      {renderPagination()}
    </Box>
  );
};

export default Discounts;
