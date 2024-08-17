export const GetPage = `#graphql
query GetPage($handle:String!) { 
  page(handle: $handle) {
    id
    title
    handle
    metafield(key: "ha_theme_content", namespace: "custom") {
      key
      id
      value
      type
      reference {
        ... on Metaobject {
          id
          type
          handle
          fields {
            type
            value
            reference {
              ... on Metaobject {
                id
                type
                handle
                fields {
                  type
                  value
                  key
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
            }
            key
          }
        }
      }
    }
  }
}
`;
