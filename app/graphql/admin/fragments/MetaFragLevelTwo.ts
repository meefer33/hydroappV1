import { MetaFragLevelThree } from "./MetaFragLevelThree";

export const MetaFragLevelTwo = `#graphql
fragment MetaFragLevelTwo on Metaobject
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

      }
    }
  }
}

` as const;
