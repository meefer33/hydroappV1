
export const MetaFragLevelThree = `#graphql
fragment MetaFragLevelThree on Metaobject
{
  id
  type
  handle
  fields {      
    type
      value
      key
    }
  }
` as const;
