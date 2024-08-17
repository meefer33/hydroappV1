export const GetMetaobjectByHandle = `#graphql
query GetMetaobjectByHandle($handle: MetaobjectHandleInput!) {
  metaobjectByHandle(handle:$handle) {
    fields {
      key
      type
      value
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
    handle
    id
    type
  }
}`;
