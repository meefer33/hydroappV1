export const GetMetaobjectDefinitionByType = `#graphql
query GetMetaobjectDefinitionByType($type: String!){
metaobjectDefinitionByType(type: $type) {
    name
  }
}
`;
