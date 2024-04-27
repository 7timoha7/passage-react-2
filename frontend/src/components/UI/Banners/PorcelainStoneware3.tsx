import React from 'react';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselItem } from 'mdb-react-ui-kit';
import img1 from '../../../assets/images/banner3/1.jpeg';
import img2 from '../../../assets/images/banner3/2.jpeg';
import img3 from '../../../assets/images/banner3/3.jpeg';
import img4 from '../../../assets/images/banner3/4.png';
import img5 from '../../../assets/images/banner3/5.jpeg';
import img6 from '../../../assets/images/banner3/6.jpeg';

import img1mini from '../../../assets/images/banner3/mini/1.jpeg';
import img2mini from '../../../assets/images/banner3/mini/2.jpeg';
import img3mini from '../../../assets/images/banner3/mini/3.jpeg';
import img4mini from '../../../assets/images/banner3/mini/4.png';
import img5mini from '../../../assets/images/banner3/mini/5.jpeg';
import img6mini from '../../../assets/images/banner3/mini/6.jpeg';
import { useMediaQuery } from '@mui/material';

const PorcelainStoneware3 = () => {
  const isMobile = useMediaQuery('@media (min-width: 650px)');

  return (
    <>
      <MDBCarousel showIndicators showControls fade style={{ margin: 0 }}>
        <MDBCarouselItem itemId={1}>
          <img src={isMobile ? img1 : img1mini} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>FUSION</h5>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={2}>
          <img src={isMobile ? img2 : img2mini} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>OPULENCE</h5>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={3}>
          <img src={isMobile ? img3 : img3mini} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>IVORIS</h5>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={4}>
          <img src={isMobile ? img4 : img4mini} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>POLARIS</h5>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={5}>
          <img src={isMobile ? img5 : img5mini} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>CUTLERY</h5>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={6}>
          <img src={isMobile ? img6 : img6mini} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>SUGGESTIONS</h5>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarousel>
    </>
  );
};

export default PorcelainStoneware3;
