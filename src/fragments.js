import { graphql } from 'gatsby';

export const ProductFields = graphql`
  fragment ShopifyProductFields on ShopifyProduct {
    title
    shopifyId
    id
    description
    images {
      id
      localFile {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`;

export const ProductTileFields = graphql`
  fragment ProductTileFields on ShopifyProduct {
    handle
    priceRange {
      minVariantPrice {
        amount
      }
    }
  }
`;
