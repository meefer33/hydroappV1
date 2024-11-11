import { MetaFragLevelUp } from "./MetaFragLevelUp";

export const MetaFragLevel = `#graphql
fragment MetaLevel on Metaobject
{
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
        ...MetaFragLevelUp
      }
      references(first: 100) {
        nodes {
          ... on MediaImage {
          id
          image {
            url
            width
            height
            altText
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
        ...MetaFragLevelUp
      }
    }
  }
}
${MetaFragLevelUp}
` as const;
