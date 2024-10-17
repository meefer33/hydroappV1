export const UpdateMetaobject = `#graphql
mutation UpdateMetaobject($id: ID!, $metaobject: MetaobjectUpdateInput!) {
  metaobjectUpdate(
    id: $id,
    metaobject: $metaobject
  ) {
    metaobject {
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
    userErrors {
      field
      message
      code
    }
  }
}`;