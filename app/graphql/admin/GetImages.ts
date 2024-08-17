export const GetImages = `#graphql
query GetImages($search: String) {
    files(
        first: 100,
        query: $search,
        sortKey: CREATED_AT,
        reverse: true
    ) {
      nodes {
        preview {
        image {
          url
        }
      }
        ... on MediaImage {
          id
          updatedAt
          
          image {
            altText
            id
            url
            height
            width
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
}`;
