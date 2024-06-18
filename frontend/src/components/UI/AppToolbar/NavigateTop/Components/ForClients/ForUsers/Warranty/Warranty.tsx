import React from 'react';
import { Paper, Typography } from '@mui/material';

const Warranty = () => {
  return (
    <>
      <Typography sx={{ mt: '30px' }} variant="h4">
        ГАРАНТИЯ
      </Typography>
      <Paper
        sx={{
          p: 3,
          mt: 2,
          mb: 2,
        }}
      >
        <Typography variant="body1" paragraph>
          Добро пожаловать в наш магазин сантехники!
        </Typography>
        <Typography variant="body1" paragraph>
          Мы рады предложить вам продукцию ведущего производителя сантехники KLUDI RAK. В нашем ассортименте вы найдете
          всё необходимое для создания комфорта и уюта в вашем доме:
        </Typography>
        <Typography variant="body1" component="ul" paragraph>
          <li>Унитазы</li>
          <li>Смесители</li>
          <li>Душевые кабины</li>
          <li>Ванны</li>
          <li>И многое другое</li>
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Почему выбирают KLUDI RAK?</strong>
        </Typography>
        <Typography variant="body1" component="ol" paragraph>
          <li>
            Высокое качество: Продукция KLUDI RAK изготавливается с использованием современных технологий и материалов,
            что гарантирует её долговечность и надёжность.
          </li>
          <li>
            Современный дизайн: Разнообразие моделей и элегантный дизайн позволяют выбрать идеальное решение для любого
            интерьера.
          </li>
          <li>
            Удобство и комфорт: Эргономичность и функциональность продукции обеспечивают максимальное удобство в
            использовании.
          </li>
          <li>
            Экологичность: KLUDI RAK заботится об окружающей среде, используя экологически чистые материалы и
            технологии.
          </li>
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Гарантия 10 лет</strong>
        </Typography>
        <Typography variant="body1" paragraph>
          Мы настолько уверены в качестве продукции KLUDI RAK, что предоставляем на неё гарантию 10 лет. Это означает,
          что в течение этого времени вы можете быть уверены в надежности вашей сантехники.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Приходите к нам</strong>
        </Typography>
        <Typography variant="body1" paragraph>
          Посетите наш магазин и ознакомьтесь с полным ассортиментом продукции KLUDI RAK. Наши квалифицированные
          консультанты всегда готовы помочь вам с выбором и ответить на все ваши вопросы.
        </Typography>
        <Typography variant="body1" paragraph>
          Создайте комфорт в вашем доме с продукцией KLUDI RAK и наслаждайтесь её качеством и стилем долгие годы!
        </Typography>
      </Paper>
    </>
  );
};

export default Warranty;
