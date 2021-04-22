const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const { data } = await graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            shopifyId
            id
            handle
          }
        }
      }
    }
  `);

  const { allShopifyProduct } = data;
  allShopifyProduct.edges.forEach(({ node }) => {
    createPage({
      path: `product/${node.handle}`,
      context: {
        shopifyId: node.id,
      },
      component: path.resolve('./src/templates/ProductTemplate/index.js'),
    });
  });
};
