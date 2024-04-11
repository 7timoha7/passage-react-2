import { createTheme } from '@mui/material';

const customTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: '#000000', // цвет текста лейбла
          },
          '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            color: '#000000', // цвет текста лейбла при сжатии
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            '& fieldset': {
              borderColor: '#000000', // цвет рамки текстового поля
            },
            '&:hover fieldset': {
              borderColor: '#212121', // цвет рамки текстового поля при наведении
            },
            '&.Mui-focused fieldset': {
              borderColor: '#313131', // цвет рамки текстового поля при фокусировке
            },
            '& .MuiInputLabel-root': {
              color: '#232323', // цвет текста лейбла при фокусировке
            },
            '& .MuiOutlinedInput-input': {
              color: '#000000', // цвет текста внутри текстового поля
            },
          },
        },
      },
    },
  },
});
export default customTheme;
