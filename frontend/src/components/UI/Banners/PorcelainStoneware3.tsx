import React from 'react';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselItem } from 'mdb-react-ui-kit';
import img1 from '../../../assets/images/banner3/1.jpeg';
import img2 from '../../../assets/images/banner3/2.jpeg';
import img3 from '../../../assets/images/banner3/3.jpeg';
import img4 from '../../../assets/images/banner3/4.png';
import img5 from '../../../assets/images/banner3/5.jpeg';
import img6 from '../../../assets/images/banner3/6.jpeg';

const PorcelainStoneware3 = () => {
  return (
    <>
      <MDBCarousel showIndicators showControls fade style={{ margin: 0 }}>
        <MDBCarouselItem itemId={1}>
          <img src={img1} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>FUSION</h5>
            {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={2}>
          <img src={img2} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>OPULENCE</h5>
            {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={3}>
          <img src={img3} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>IVORIS</h5>
            {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={4}>
          <img src={img4} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>POLARIS</h5>
            {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={5}>
          <img src={img5} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>CUTLERY</h5>
            {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={6}>
          <img src={img6} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>SUGGESTIONS</h5>
            {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarousel>
    </>
  );
};

export default PorcelainStoneware3;
