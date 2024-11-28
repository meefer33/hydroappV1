import { MetaFragLevelTwo } from "./MetaFragLevelTwo";

export const MetaFragLevelOne = `#graphql
fragment MetaFragLevelOne on Metaobject
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
        ...MetaFragLevelTwo
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
        ...MetaFragLevelTwo
      }
    }
  }
}
${MetaFragLevelTwo}
` as const;
