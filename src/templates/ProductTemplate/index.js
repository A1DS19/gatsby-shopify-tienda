/*eslint-disable jsx-a11y/no-onchange*/
import { graphql } from 'gatsby';
import React from 'react';
import { Layout, ImageGallery, ProductQuantityAdder, SEO } from 'components';
import { Grid, SelectWrapper, Price } from './styles';
import CartContext from '../../context/CartContext';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';
import { Button } from 'components';

//al exportar hace accesable los datos en los
//props
export const query = graphql`
  query ProductQuery($shopifyId: String) {
    shopifyProduct(id: { eq: $shopifyId }) {
      ...ShopifyProductFields
    }
  }
`;

export default function ProductTemplate(props) {
  const { data } = props;
  const { title, description, images, shopifyId } = data.shopifyProduct;
  const { getProductById } = React.useContext(CartContext);
  const [product, setProduct] = React.useState(null);
  const [selectedVariant, setSelectedVariant] = React.useState(null);
  const { search, origin, pathname } = useLocation();
  const variantId = queryString.parse(search).variant;

  React.useEffect(() => {
    (async () => {
      try {
        const res = await getProductById(shopifyId);
        setProduct(res);
        setSelectedVariant(
          res.variants.find(variant => variant.id === variantId) ||
            res.variants[0]
        );
      } catch (error) {
        console.log(`PRODUCT PAGE: ${error}`);
      }
    })();
  }, [getProductById, data, setProduct, shopifyId, variantId]);

  const handleVariantChange = e => {
    const variant = product?.variants.find(
      variant => variant.id === e.target.value
    );
    setSelectedVariant(variant);
    //crea nueva url basada en query string
    //el replace dinamicamente cambia la url basada
    //en el variant.id
    navigate(`${origin}${pathname}?variant=${encodeURIComponent(variant.id)}`, {
      replace: true,
    });
  };

  const renderVariants = product?.variants.map(prod => {
    return (
      <option key={prod.id} value={prod.id}>
        {prod.title}
      </option>
    );
  });

  return (
    <Layout>
      <SEO
        title={props.data.shopifyProduct.title}
        description={props.data.shopifyProduct.description}
      />
      <Button onClick={() => navigate(-1)}>Volver</Button>
      <Grid>
        <div>
          <h1>{title}</h1>
          <p>{description}</p>

          {product?.availableForSale && !!selectedVariant && (
            <React.Fragment>
              {product?.variants.length > 1 && (
                <SelectWrapper>
                  <strong>Variante</strong>
                  <select
                    value={selectedVariant.id}
                    onChange={handleVariantChange}
                  >
                    {renderVariants}
                  </select>
                </SelectWrapper>
              )}
            </React.Fragment>
          )}

          {selectedVariant && (
            <React.Fragment>
              <Price>₡{Math.round(selectedVariant?.price)}</Price>
              <ProductQuantityAdder
                variantId={selectedVariant?.id}
                available={selectedVariant?.available}
              />
            </React.Fragment>
          )}
        </div>
        <div>
          <ImageGallery
            selectedVariantImageId={selectedVariant?.image.id}
            images={images}
          />
        </div>
      </Grid>
    </Layout>
  );
}
