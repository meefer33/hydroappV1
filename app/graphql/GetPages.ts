export const GetPages = `#graphql
query GetPages {
  pages(first: 100) {
    nodes {
        handle
        id
        title
        createdAt
        updatedAt
    }
  }
}
`