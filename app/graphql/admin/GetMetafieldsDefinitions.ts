export const GetMetafieldsDefinitions = `#graphql
query GetMetafieldsDefinitions($query: String) {
  metafieldDefinitions(ownerType: PRODUCT, first: 10, query: $query) {
    nodes {
      key
      id
      name
    }
  }
}`;