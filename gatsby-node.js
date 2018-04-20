const path = require(`path`);

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsClothingItem {
          edges {
            node {
              slug
            }
          }
        }
      }
    `)
      .then(result => {
        result.data.allDatoCmsClothingItem.edges.map(({ node: item }) => {
          createPage({
            path: `items/${item.slug}`,
            component: path.resolve(`./src/templates/item.js`),
            context: {
              slug: item.slug
            }
          });
        });
        resolve();
      })
      .catch(e => reject(e));
  });
};
