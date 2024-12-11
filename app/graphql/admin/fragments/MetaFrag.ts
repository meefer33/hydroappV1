export const MetaFrag = `#graphql
fragment Meta on Metaobject
{
    handle
    id
    type
    updatedAt
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
            type
              value
              key
              reference {
                ... on Metaobject {
                  id
                  type
                  handle
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
                                            }}
                                        }
                                      }
                                    }}
                                }
                              }
                            }
                          }
                        }
                      }
                  }
                }
                ... on Collection {
                  handle
                  id
                  title
                  description
                  image {
                    url
                  }
                  products(first: 10) {
                    nodes {
                      handle
                      id
                      description(truncateAt: 150)
                      featuredImage {
                        url
                        id
                        altText
                      }
                      title
                      tags
                    }
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
                            type
                            handle
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
              reference {
                ... on Collection {
                  handle
                  id
                  title
                  description
                  image {
                    url
                  }
                  products(first: 10) {
                    nodes {
                      handle
                      id
                      description(truncateAt: 150)
                      featuredImage {
                        url
                        id
                        altText
                      }
                      title
                      tags
                    }
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
                            type
                            handle
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
  }` ;
