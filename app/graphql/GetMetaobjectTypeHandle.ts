export const GetMetaobjectTypeHandle = `#graphql
query GetMetaobjectTypeHandle($handle: String!,$type: String!) {
  metaobject(handle: {handle: $handle, type: $type}) {
    handle
    id
    fields {
      key
      type
      value
      reference {
        ... on Metaobject {
          id
          type
          handle
          fields {
            key
            type
            value
          }
        }
      }
    }
  }
}`;
