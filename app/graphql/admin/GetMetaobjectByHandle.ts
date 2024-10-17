export const GetMetaobjectByHandle = `#graphql
query GetMetaobjectByHandle($handle: MetaobjectHandleInput!) {
  metaobjectByHandle(handle:$handle) {
    fields {
      key
      type
      value
      jsonValue
      references(first: 100) {
        nodes{
        ... on Metaobject {
          handle
          fields {
            type
            value
            key
          }
        }
        }
      }
      reference {
        ... on Metaobject {
          handle
          displayName
          fields {
            type
            value
            key
            reference {
              ... on Metaobject {
                handle
                displayName
                fields {
                  type
                  value
                  key
                }
              }
            }
          }
        }
      }
    }
    handle
    id
    type
  }
}`;
