import React from 'react';
import { Layout } from 'components';
import ProductContext from 'context/ProductContext';
import { HomepageCollectionsGrid } from 'components';
import { FeaturedProducts, SEO } from 'components';

const IndexPage = () => {
  const { collections } = React.useContext(ProductContext);

  return (
    <Layout>
      <SEO title="Homepage" description="El Ecommerce universal" />
      <HomepageCollectionsGrid
        collections={collections.filter(
          collection => collection.title !== 'Destacadas'
        )}
      />
      {!!collections.find(({ title }) => title === 'Destacadas') && (
        <FeaturedProducts />
      )}
    </Layout>
  );
};

export default IndexPage;
