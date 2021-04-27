import React from 'react';
import BackgroundImage from 'gatsby-background-image';
import { StyledLink } from '../common/StyledLink';
import {
  CollectionTileContent,
  CollectionTileWrapper,
  Description,
  Title,
} from './styles';

export const CollectionTile = ({
  title,
  description,
  backgroundImage,
  sale,
  destination,
}) => {
  return (
    <CollectionTileWrapper>
      <BackgroundImage fluid={backgroundImage} />
      <CollectionTileContent>
        <div>
          <Title sale={sale}>{title}</Title>
          <Description sale={sale}>{description}</Description>
          <StyledLink to={destination}>Comprar ahora</StyledLink>
        </div>
      </CollectionTileContent>
    </CollectionTileWrapper>
  );
};
