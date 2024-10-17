export const GetPage = `#graphql
query GetPage($handle:String!) { 
  page(handle: $handle) {
    handle
    title
    seo {
      description
      title
    }
    updatedAt
    metafield(key: "content", namespace: "custom") {
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
}
`;
