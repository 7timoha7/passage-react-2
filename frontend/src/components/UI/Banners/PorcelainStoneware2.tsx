import React from 'react';
import img1 from '../../../assets/images/banner2/1.jpg';
import img2 from '../../../assets/images/banner2/2.jpg';
import img3 from '../../../assets/images/banner2/3.jpg';
import img4 from '../../../assets/images/banner2/4.jpg';
import img5 from '../../../assets/images/banner2/5.jpg';

import img1mini from '../../../assets/images/banner2/mini/1.jpg';
import img2mini from '../../../assets/images/banner2/mini/2.jpg';
import img3mini from '../../../assets/images/banner2/mini/3.jpg';
import img4mini from '../../../assets/images/banner2/mini/4.jpg';
import img5mini from '../../../assets/images/banner2/mini/5.jpg';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import { useMediaQuery } from '@mui/material';

const PorcelainStoneware2 = () => {
  const isMobile = useMediaQuery('@media (min-width: 650px)');
  return (
    <>
      <MDBCarousel showIndicators showControls fade style={{ margin: 0 }}>
        <MDBCarouselItem itemId={1}>
          <img src={isMobile ? img1 : img1mini} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>Basin Mixer</h5>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={2}>
          <img src={isMobile ? img2 : img2mini} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>Bidet Mixer</h5>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={3}>
          <img src={isMobile ? img3 : img3mini} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>Kitchen Mixer</h5>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={4}>
          <img src={isMobile ? img4 : img4mini} className="d-block w-100" alt="..." />
          <MDBCarouselCaption></MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={5}>
          <img src={isMobile ? img5 : img5mini} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>Shower Range</h5>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarousel>
    </>
  );
};

export default PorcelainStoneware2;
