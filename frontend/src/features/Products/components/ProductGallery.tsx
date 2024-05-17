import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { apiURL } from '../../../constants';
import './BtnClose.css';

interface Props {
  images: string[];
}

const ProductGallery: React.FC<Props> = ({ images }) => {
  const galleryImages = images.map((image) => ({
    original: apiURL + '/' + image,
    thumbnail: apiURL + '/' + image,
    originalHeight: 800,
    originalWidth: 600,
    thumbnailMaxHeight: 150,
    thumbnailMaxWidth: 100,
  }));

  const handleScreenChange = (isFullScreen: boolean) => {
    if (isFullScreen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      galleryRef.current?.exitFullScreen();
    }
  };

  const galleryRef = React.useRef<ImageGallery>(null);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '1200px' }}>
        <ImageGallery
          ref={galleryRef}
          items={galleryImages}
          onScreenChange={handleScreenChange}
          onClick={() => galleryRef.current?.fullScreen()}
          lazyLoad={true}
          renderFullscreenButton={(onClick, isFullscreen) =>
            isFullscreen ? (
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                }}
              >
                <button className="button" onClick={() => galleryRef.current?.exitFullScreen()}>
                  <span className="X"></span>
                  <span className="Y"></span>
                  <div className="close">Close</div>
                </button>
              </div>
            ) : null
          }
        />
      </div>
    </div>
  );
};

export default ProductGallery;
