import React from 'react';
import Image from 'gatsby-image';
import { ImageThumbnailWrapper } from './styles';

export default function ImageThumbnail({ activeImage, onClick, image }) {
  const currentImage = image.localFile.childImageSharp.fluid;

  const handleImageClick = () => {
    onClick(currentImage);
  };

  return (
    <ImageThumbnailWrapper
      className={activeImage === currentImage && 'active'}
      onClick={handleImageClick}
    >
      <Image fluid={currentImage} />
    </ImageThumbnailWrapper>
  );
}
