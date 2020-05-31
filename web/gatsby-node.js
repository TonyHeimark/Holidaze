//const {isFuture} = require('date-fns')
/*
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const createEstablishmentPages = async (graphql, actions, reporter) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityEstablishments {
        edges {
          node {
            _id
            id
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const edges = (result.data.allSanityEstablishments || {}).edges || [];

  edges.forEach((edge, index) => {
    const { id, _id } = edge.node;
    const path = `/browse/${_id}/`;

    reporter.info(`Creating establishment page: ${path}`);

    createPage({
      path,
      component: require.resolve("./src/templates/establishmentTemplate.js"),
      context: { id }
    });
  });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createEstablishmentPages(graphql, actions, reporter);
};
