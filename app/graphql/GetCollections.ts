export const GetCollections = `#graphql
  query GetCollections 
  {
    collections(
      first: 200,
    ) {
    nodes {
    ... on Collection {
          handle
          id
          title
          description
          image {
            url
          }
          products(first: 10) {
            nodes {
              handle
              id
              description(truncateAt: 150)
              featuredImage {
                url
                id
                altText
              }
              title
              tags
            }
          }
        }
      }
    }
  }
` as const;
