import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import img_discount from '../../../assets/images/discount/discount_img.png';
import { btnUserItemColor } from '../../../styles';
import { themeDiscount } from '../../../theme';
import { MuiTelInput } from 'mui-tel-input';
import { DiscountTypeToServer } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createDiscount } from '../disccountsThunks';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { selectCreateDiscountLoading } from '../discountsSlice';

interface FormData {
  name: string;
  phone: string;
  source: string;
  sourceOther: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  source?: string;
}

const GetADiscount: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    source: '',
    sourceOther: '',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectCreateDiscountLoading);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const sources = [
    'По рекомендации друзей/знакомых',
    'Через поиск в Google',
    'Instagram',
    'Facebook',
    'Я у вас уже давно покупаю',
    'Уличный трафик',
    'Другое',
  ];

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Обязательно для заполнения';
    if (!formData.phone.trim()) newErrors.phone = 'Обязательно для заполнения';

    if (!formData.source.trim()) {
      newErrors.source = 'Выберите один из вариантов';
    } else if (formData.source === 'Другое' && !formData.sourceOther.trim()) {
      newErrors.source = 'Укажите другое';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Если не выбрано "Другое", очищаем поле sourceOther
    setFormData({
      ...formData,
      source: value,
      sourceOther: value === 'Другое' ? formData.sourceOther : '',
    });
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const formSend: DiscountTypeToServer = {
        name: formData.name,
        phone: formData.phone,
        source: formData.sourceOther && formData.source === 'Другое' ? formData.sourceOther : formData.source,
      };
      setAlert({ open: true, message: 'Форма успешно отправлена!', severity: 'success' });

      await dispatch(createDiscount(formSend));
      setIsModalOpen(true);
    } else {
      setAlert({ open: true, message: 'Пожалуйста, заполните все поля.', severity: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handlePhoneChange = (newPhone: string) => {
    setFormData({ ...formData, phone: newPhone });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate('/'); // Переходим на главную страницу
  };

  return (
    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
      <img style={{ width: '100%', marginBottom: '20px', borderRadius: '15px' }} src={img_discount} alt="discount" />
      <ThemeProvider theme={themeDiscount}>
        <Card sx={{ padding: '2rem', maxWidth: '600px', margin: '2rem auto' }}>
          <TextField
            fullWidth
            label="Ваше имя"
            value={formData.name}
            onChange={handleInputChange('name')}
            error={!!errors.name}
            helperText={errors.name}
            sx={{ marginBottom: '1rem' }}
          />
          <MuiTelInput
            label={'Номер телефона'}
            onChange={handlePhoneChange}
            defaultCountry="KG"
            name="phone"
            error={!!errors.phone}
            helperText={errors.phone}
            value={formData.phone}
            sx={{ marginBottom: '1rem' }}
          />

          <Typography variant="h5" sx={{ marginTop: '1rem' }}>
            Откуда узнали о нас?
          </Typography>
          <FormControl component="fieldset" error={!!errors.source} sx={{ marginBottom: '1rem' }}>
            <RadioGroup value={formData.source} onChange={handleSourceChange}>
              {sources.map((source) => (
                <FormControlLabel key={source} value={source} control={<Radio />} label={source} />
              ))}
            </RadioGroup>
            {errors.source && <Typography color="error">{errors.source}</Typography>}
          </FormControl>
          {formData.source === 'Другое' && (
            <TextField
              fullWidth
              placeholder="Укажите другое"
              value={formData.sourceOther}
              onChange={handleInputChange('sourceOther')}
              error={!!errors.source && formData.source === 'Другое'}
              helperText={errors.source === 'Другое' && errors.source}
              sx={{ marginBottom: '1rem' }}
            />
          )}

          <Box textAlign="center" sx={{ marginTop: '2rem' }}>
            <Button
              disabled={loading}
              variant={'outlined'}
              sx={btnUserItemColor}
              color="primary"
              onClick={handleSubmit}
            >
              Отправить
            </Button>
          </Box>

          {alert.open && (
            <Alert
              severity={alert.severity === 'success' ? 'success' : 'error'}
              onClose={handleCloseAlert}
              sx={{ marginTop: '1rem' }}
            >
              {alert.message}
            </Alert>
          )}
        </Card>
      </ThemeProvider>

      <Dialog open={isModalOpen} onClose={handleModalClose}>
        <DialogTitle>Успех</DialogTitle>
        <DialogContent>
          <DialogContentText>Данные успешно отправлены!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} variant={'outlined'} sx={btnUserItemColor}>
            ОК
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GetADiscount;
