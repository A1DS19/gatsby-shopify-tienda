import React from 'react';
import ProductContext from '../../context/ProductContext';
import { CategoryFilterItem } from './CategoryFilterItem';
import { FiltersWrapper } from './styles';

export const Filters = () => {
  const { collections } = React.useContext(ProductContext);

  return (
    <FiltersWrapper>
      <strong>Categorias</strong>
      {collections.map(collection => {
        return (
          <CategoryFilterItem
            key={collection.shopifyId}
            title={collection.title}
            collectionId={collection.shopifyId}
          />
        );
      })}
    </FiltersWrapper>
  );
};
