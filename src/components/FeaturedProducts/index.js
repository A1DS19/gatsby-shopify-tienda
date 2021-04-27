import React from 'react';
import ProductContext from 'context/ProductContext';
import { ProductGrid } from '../ProductsGrid';

export const FeaturedProducts = () => {
  const { collections } = React.useContext(ProductContext);
  const featuredCollection = collections.find(
    ({ title }) => title === 'Destacadas'
  );

  return (
    <section>
      <h1>Destacados</h1>
      <ProductGrid products={featuredCollection?.products} />
    </section>
  );
};
