export const GetMetaobjectTypeHandle = `#graphql
query GetMetaobjectTypeHandle($handle: String!,$type: String!) {
  metaobject(handle: {handle: $handle, type: $type}) {
    handle
    id
    type
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
      references(first: 10) {
        nodes {
          ... on Metaobject {
            id
            handle
            type
            fields {
              type
              value
              key
              references(first: 10) {
                nodes {
                  ... on Metaobject {
                    id
                    handle
                    type
                    fields {
                      type
                      value
                      key
                      references(first: 10) {
                        nodes {
                          ... on Metaobject {
                            id
                            type
                            fields {
                              type
                              value
                              key
                              reference {
                                ... on MediaImage {
                                  id
                                  image {
                                    url
                                    width
                                    height
                                    altText
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;
