import React from 'react';
import { Description, ProductTileWrapper, Title, Price } from './styled';
import Img from 'gatsby-image';
import { StyledLink } from '../common/StyledLink';

export const ProductTile = ({
  product: { title, images, description, priceRange, handle },
}) => {
  const image = images[0].localFile.childImageSharp.fluid;
  const price = priceRange.minVariantPrice.amount;

  return (
    <ProductTileWrapper>
      <Img fluid={image} />
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Price>Desde ₡{parseFloat(price).toFixed(0)}</Price>
      <StyledLink to={`/product/${handle}`}>Ver</StyledLink>
    </ProductTileWrapper>
  );
};
