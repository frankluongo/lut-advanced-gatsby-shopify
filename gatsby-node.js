const path = require("path")

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const pages = await graphql(`
    query PagesQuery {
      allShopifyProduct {
        edges {
          node {
            id
            handle
          }
        }
      }
    }
  `)

  pages.data.allShopifyProduct.edges.forEach(({ node: { id, handle } }) => {
    createPage({
      path: `/product/${handle}`,
      component: path.resolve("./src/templates/ProductDetailTemplate.js"),
      context: {
        id,
        handle,
      },
    })
  })

  const collections = await graphql(`
    query CollectionsQuery {
      allShopifyCollection {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  `)

  collections.data.allShopifyCollection.edges.forEach(
    ({ node: { id, handle } }) => {
      createPage({
        path: `/collections/${handle}`,
        component: path.resolve("./src/templates/ProductCollectionTemplate.js"),
        context: {
          id,
          handle,
        },
      })
    }
  )
}
