import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const query = graphql`
  {
    allShopifyProduct {
      edges {
        node {
          ...ShopifyProductFields
          ...ProductTileFields
        }
      }
    }

    allShopifyCollection(sort: { fields: title, order: ASC }) {
      edges {
        node {
          id
          title
          description
          shopifyId
          image {
            id
            localFile {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          products {
            ...ShopifyProductFields
            ...ProductTileFields
          }
        }
      }
    }
  }
`;

const defaultState = {
  products: [],
};

const ProductContext = React.createContext(defaultState);
export default ProductContext;

export function ProductContextProvider({ children }) {
  const { allShopifyCollection, allShopifyProduct } = useStaticQuery(query);

  return (
    <ProductContext.Provider
      value={{
        products: allShopifyProduct.edges.map(item => item.node),
        collections: allShopifyCollection.edges.map(item => item.node),
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
