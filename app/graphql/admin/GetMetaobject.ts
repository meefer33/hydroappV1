export const GetMetaobject = `#graphql
query GetMetaobject($type: String!) {
  metaobjects(type: $type, first: 100, sortKey: "updated_at", reverse: true) {
    nodes {
      handle
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
      displayName
      updatedAt
      id
    }
  }
}`;
