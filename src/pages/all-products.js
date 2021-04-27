import React from 'react';
import { Layout, ProductGrid } from 'components';
import ProductContext from '../context/ProductContext';
import styled from 'styled-components';
import { Filters, SEO } from 'components';
import queryString from 'query-string';
import { useLocation } from '@reach/router';

const Content = styled.div`
  display: grid;
  grid-gap: 20px;
  margin-top: 20px;
  grid-template-columns: 1fr 3fr;
`;

export default function AllProducts() {
  const { products, collections } = React.useContext(ProductContext);
  const collectionProductMap = {};
  const { search } = useLocation();
  const qs = queryString.parse(search);
  const selectedCollectionIds = qs.c?.split(',').filter(c => !!c) || [];
  const selectedCollectionMap = {};
  const searchTerm = qs.s;

  selectedCollectionIds.forEach(collectionId => {
    selectedCollectionMap[collectionId] = true;
  });

  if (collections) {
    collections.forEach(collection => {
      collectionProductMap[collection.shopifyId] = {};

      collection.products.forEach(product => {
        collectionProductMap[collection.shopifyId][product.shopifyId] = true;
      });
    });
  }

  const filterByCategory = product => {
    if (Object.keys(selectedCollectionMap).length) {
      for (let key in selectedCollectionMap) {
        if (collectionProductMap[key]?.[product.shopifyId]) {
          return true;
        } else {
          return false;
        }
      }
    }
    return true;
  };

  //filtra productos por el nombre
  const filterBySearchTerm = product => {
    if (searchTerm) {
      return product.title.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
    }
    return true;
  };

  const filteredProducts = products
    .filter(filterByCategory)
    .filter(filterBySearchTerm);

  return (
    <Layout>
      <SEO title="Todos los productos" description="Todos los productos" />
      {searchTerm && !!filteredProducts.length && (
        <h4>
          Termino de busqueda: <strong>'{searchTerm}'</strong>
        </h4>
      )}
      {!!filteredProducts.length && (
        <h4>{filteredProducts.length} productos</h4>
      )}
      <Content>
        <Filters />
        {!filteredProducts.length && (
          <div>
            <h3>
              <span>
                Oh no! Articulo <strong>'{searchTerm}'</strong> no existe...
              </span>
              &nbsp;
            </h3>
          </div>
        )}
        {!!filteredProducts.length && (
          <div>
            <ProductGrid products={filteredProducts} />
          </div>
        )}
      </Content>
    </Layout>
  );
}
