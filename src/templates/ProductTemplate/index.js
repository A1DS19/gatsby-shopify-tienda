import { graphql } from 'gatsby';
import React from 'react';
import { Layout } from 'components';
import { Grid } from './styles';

//al exportar hace accesable los datos en los
//props
export const query = graphql`
  query ProductQuery($shopifyId: String) {
    shopifyProduct(id: { eq: $shopifyId }) {
      title
      id
      description
      images {
        localFile {
          childImageSharp {
            fluid(maxWidth: 300) {
              src
            }
          }
        }
      }
    }
  }
`;

export default function ProductTemplate(props) {
  const { data } = props;
  const { title, description } = data.shopifyProduct;
  return (
    <Layout>
      <Grid>
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div>image</div>
      </Grid>
    </Layout>
  );
}
