import React from 'react';
import { CollectionTile } from '../CollectionTile';
import { OtherCollection } from './styles';

export const HomepageCollectionsGrid = ({ collections }) => {
  const saleCollection = collections.find(({ title }) => title === 'SALE');
  const otherCollections = collections.filter(({ title }) => title !== 'SALE');

  const renderConllection = otherCollections.map(collection => {
    return (
      <CollectionTile
        destination={`/all-products?c=${encodeURIComponent(
          collection.shopifyId
        )}`}
        key={collection.shopifyId}
        title={collection.title}
        description={collection.description}
        backgroundImage={collection?.image?.localFile.childImageSharp.fluid}
      />
    );
  });

  return (
    <div>
      {!!saleCollection && (
        <CollectionTile
          sale
          destination={`/all-products?c=${encodeURIComponent(
            saleCollection.shopifyId
          )}`}
          title={saleCollection.title}
          description={saleCollection.description}
          backgroundImage={
            saleCollection?.image?.localFile.childImageSharp.fluid
          }
        />
      )}
      <OtherCollection>{renderConllection}</OtherCollection>
    </div>
  );
};
