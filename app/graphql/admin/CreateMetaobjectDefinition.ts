export const CreateMetaobjectDefinition = `#graphql
mutation CreateMetaobjectDefinition($definition: MetaobjectDefinitionCreateInput!) {
    metaobjectDefinitionCreate(definition: $definition) {
      metaobjectDefinition {
        id
        name
        type
        fieldDefinitions {
          name
          key
          required
        }
      }
      userErrors {
        field
        message
        code
      }
    }
  }`