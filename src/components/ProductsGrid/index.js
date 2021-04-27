import React from 'react';
import { ProductTile } from '../ProductTile';
import { ProductsGridWrapper } from './styles';

export const ProductGrid = ({ products }) => {
  return (
    <ProductsGridWrapper>
      {products.map(product => (
        <ProductTile key={product.shopifyId} product={product} />
      ))}
    </ProductsGridWrapper>
  );
};
