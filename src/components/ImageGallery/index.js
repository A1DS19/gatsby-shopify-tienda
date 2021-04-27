import React from 'react';
import Image from 'gatsby-image';
import { ImageGalleryWrapper } from './styles';
import { ImageThumbnailWrapper } from './ImageThumbnail/styles';
import { useState } from 'react';
import ImageThumbnail from './ImageThumbnail';

export const ImageGallery = ({ selectedVariantImageId, images }) => {
  const [activeImage, setActiveImage] = useState(
    images.find(img => img.id === selectedVariantImageId)?.localFile
      ?.childImageSharp?.fluid || images[0]?.localFile.childImageSharp?.fluid
  );

  React.useEffect(() => {
    setActiveImage(
      images.find(img => img?.id === selectedVariantImageId)?.localFile
        ?.childImageSharp?.fluid
    );
  }, [selectedVariantImageId, setActiveImage, images]);

  const renderImages = images.map(img => {
    return (
      <ImageThumbnailWrapper key={img.id}>
        <ImageThumbnail
          activeImage={activeImage}
          onClick={setActiveImage}
          image={img}
        />
      </ImageThumbnailWrapper>
    );
  });

  return (
    <React.Fragment>
      <ImageGalleryWrapper>
        <div>
          <Image fluid={activeImage} />
        </div>
        <div>{renderImages}</div>
      </ImageGalleryWrapper>
    </React.Fragment>
  );
};
