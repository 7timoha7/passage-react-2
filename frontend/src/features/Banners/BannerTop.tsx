import React from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselItem } from 'mdb-react-ui-kit';
import { apiURL } from '../../constants';
import { useNavigate } from 'react-router-dom';
import PorcelainStoneware from '../../components/UI/Banners/PorcelainStoneware';
import { BannerType } from '../../types';
import { Typography } from '@mui/material';

interface Props {
  banners: BannerType[];
  loadingFetch: boolean;
}

const BannerTop: React.FC<Props> = ({ banners, loadingFetch }) => {
  const navigate = useNavigate();

  const handleClick = (link?: string) => {
    if (link && link.trim() !== '') {
      if (link.startsWith('http://') || link.startsWith('https://')) {
        window.location.href = link;
      } else {
        navigate(link);
      }
    }
  };

  // Фильтрация баннеров по типу 'top'
  const BannersSort = banners.filter((item) => item.typeBanner === 'top');

  return (
    <>
      {loadingFetch ? (
        <Spinner />
      ) : (
        <>
          {BannersSort.length > 0 ? (
            <MDBCarousel showIndicators showControls fade style={{ margin: 0 }}>
              {BannersSort.map((item, index) => {
                const hasLink = item.link && item.link.trim() !== '';
                return (
                  <MDBCarouselItem key={item._id} itemId={index + 1}>
                    <img
                      src={apiURL + '/' + item.image}
                      className="d-block w-100"
                      alt="..."
                      style={{
                        objectFit: 'contain',
                        height: '100%',
                        cursor: hasLink ? 'pointer' : 'default',
                      }}
                      onClick={() => handleClick(item.link)}
                    />
                    <MDBCarouselCaption>
                      <h5>{item.title}</h5>
                      <Typography
                        sx={{
                          '@media (max-width:800px)': {
                            display: 'none',
                          },
                        }}
                      >
                        {item.desk}
                      </Typography>
                    </MDBCarouselCaption>
                  </MDBCarouselItem>
                );
              })}
            </MDBCarousel>
          ) : (
            <PorcelainStoneware />
          )}
        </>
      )}
    </>
  );
};

export default BannerTop;
