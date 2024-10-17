export const GetMetaobjectById = `#graphql
query GetMetaobjectById($id: ID!) {
    metaobject(id: $id) {
    fields {
      type
      value
      key
    }
  }
}`;
