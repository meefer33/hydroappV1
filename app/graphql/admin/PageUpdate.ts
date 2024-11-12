export const PageUpdate = `#graphql
mutation PageUpdate($id: ID!, $page: PageUpdateInput!) {
  pageUpdate(id: $id,page: $page) {
    page {
      id
    }
  }
}`;


