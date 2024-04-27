import React from 'react';
import img1 from '../../../assets/images/banner1/1.jpg';
import img2 from '../../../assets/images/banner1/2.jpg';
import img3 from '../../../assets/images/banner1/3.jpg';
import img4 from '../../../assets/images/banner1/4.jpg';
import img5 from '../../../assets/images/banner1/5.jpg';
import img6 from '../../../assets/images/banner1/6.jpg';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselItem } from 'mdb-react-ui-kit';
import { Typography } from '@mui/material';

const PorcelainStoneware = () => {
  return (
    <>
      <MDBCarousel showIndicators showControls fade style={{ margin: 0 }}>
        <MDBCarouselItem itemId={1}>
          <img src={img1} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>MAXIMUS BLACK BEAUTY</h5>
            <Typography
              sx={{
                '@media (max-width:800px)': {
                  display: 'none',
                },
              }}
            >
              ПРЕДНАЗНАЧЕНА ДЛЯ СОЗДАНИЯ МНОГОФУНКЦИОНАЛЬНОГО КУХОННОГО ПРОСТРАНСТВА, ИДЕАЛЬНО ПОДХОДЯЩЕГО ДЛЯ
              ЕЖЕДНЕВНОГО ИСПОЛЬЗОВАНИЯ. ИНТЕГРАЦИЯ СИСТЕМЫ В СТОЛЕШНИЦУ ОТКРЫВАЕТ ДЛЯ ПОЛЬЗОВАТЕЛЕЙ ВОЗМОЖНОСТИ
              ГОТОВИТЬ И ОБЕДАТЬ В ОДНОМ И ТОМ ЖЕ ПРОСТРАНСТВЕ — БЕЗУПРЕЧНАЯ БЕСШОВНАЯ КУХОННАЯ СТОЛЕШНИЦА, СОЗДАННАЯ
              ДЛЯ ПРИЕМА ПИЩИ И ВСТРЕЧИ ГОСТЕЙ.
            </Typography>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={2}>
          <img src={img2} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>MAXIMUS RAIN MARBLE</h5>
            <Typography
              sx={{
                '@media (max-width:800px)': {
                  display: 'none',
                },
              }}
            >
              ЛУЧШЕЕ РЕШЕНИЕ ДЛЯ ПОТРЯСАЮЩЕГО ОФОРМЛЕНИЯ ВЕРТИКАЛЬНЫХ ПОВЕРХНОСТЕЙ, ТАКИХ КАК СТЕНЫ КУХНИ, ВАННОЙ
              КОМНАТЫ/САНУЗЛА И ПРОЧИХ СТЕН. ПЛИТКА MAXIMUS ПРИДАСТ ВАШИМ КОМНАТАМ ИНДИВИДУАЛЬНОСТЬ И ПОЗВОЛИТ
              БЕЗГРАНИЧНО ВЫРАЗИТЬ СВОЙ СТИЛЬ.
            </Typography>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId={3}>
          <img src={img3} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>MAXIMUS BLU DEL BELGIO</h5>
            <Typography
              sx={{
                '@media (max-width:800px)': {
                  display: 'none',
                },
              }}
            >
              ВОПЛОЩЕНИЕ СЛОГАНА «БОЛЬШЕ ЗНАЧИТ КРАСИВЕЕ». ВИЗУАЛЬНОЕ РАСШИРЕНИЕ ПРОСТРАНСТВА И ЕДИНООБРАЗИЕ ДИЗАЙНА.
              ИСПОЛЬЗОВАНИЕ ПЛИТКИ ДЛЯ ПОЛА – ЛУЧШИЙ СПОСОБ ОЦЕНИТЬ ЕЕ БЕСКОНЕЧНЫЕ ВОЗМОЖНОСТИ, КОТОРЫЕ ВЫРАЖАЮТСЯ В
              НЕВЕРОЯТНОЙ ЭСТЕТИЧЕСКОЙ ПРИВЛЕКАТЕЛЬНОСТИ И ВЫСОКОЙ ПРОЧНОСТИ
            </Typography>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId={4}>
          <img src={img4} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>RAK-DES</h5>
            <Typography
              sx={{
                '@media (max-width:800px)': {
                  display: 'none',
                },
              }}
            >
              ВАШ ДОМАШНИЙ ТУАЛЕТ ТЕПЕРЬ ОБЕСПЕЧИВАЕТ ПОЛНУЮ ГИГИЕНУ БЕЗ СОПРИКОСНОВЕНИЯ С ПОВЕРХНОСТЯМИ. БЕСКОНТАКТНАЯ
              СИСТЕМА СМЫВА ОТ RAK CERAMICS ПОЗВОЛЯЕТ ЭФФЕКТИВНО ОЧИЩАТЬ БЕЗ РИСКА ЗАРАЖЕНИЯ. МОДУЛЬ С ДАТЧИКОМ
              УСТАНАВЛИВАЕТСЯ ПОД КРЫШКОЙ БАЧКА УНИТАЗА И ПОДДЕРЖИВАЕТ ЧИСТОТУ БЕЗ ДОПОЛНИТЕЛЬНОГО КОНТАКТА. ЭФФЕКТИВНОЕ
              РАСПОЗНАВАНИЕ ПРИСУТСТВИЯ И ВЫБОР РЕЖИМА СМЫВА ПОДДЕРЖИВАЮТ МАКСИМАЛЬНУЮ ГИГИЕНУ В ДОМАШНИХ УСЛОВИЯХ.
            </Typography>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={5}>
          <img src={img5} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>BURANO</h5>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={6}>
          <img src={img6} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>CALACATTA NERO</h5>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarousel>
    </>
  );
};

export default PorcelainStoneware;
