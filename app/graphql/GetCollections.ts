export const GetCollections = `#graphql
  query GetCollections 
  {
    collections(
      first: 200,
    ) {
      nodes {
        ... on Collection {
            id
            title
            handle 
        }
      }
    }
  }
` as const;
