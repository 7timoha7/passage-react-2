import React from 'react';
import img1 from '../../../assets/images/banner2/1.jpg';
import img2 from '../../../assets/images/banner2/2.jpg';
import img3 from '../../../assets/images/banner2/3.jpg';
import img4 from '../../../assets/images/banner2/4.jpg';
import img5 from '../../../assets/images/banner2/5.jpg';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';

const PorcelainStoneware2 = () => {
  return (
    <>
      <MDBCarousel showIndicators showControls fade style={{ margin: 0 }}>
        <MDBCarouselItem itemId={1}>
          <img src={img1} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>Basin Mixer</h5>
            {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={2}>
          <img src={img2} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>Bidet Mixer</h5>
            {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={3}>
          <img src={img3} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>Kitchen Mixer</h5>
            {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={4}>
          <img src={img4} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            {/*<h5>Shower Mixer</h5>*/}
            {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={5}>
          <img src={img5} className="d-block w-100" alt="..." />
          <MDBCarouselCaption>
            <h5>Shower Range</h5>
            {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarousel>
    </>
  );
};

export default PorcelainStoneware2;
