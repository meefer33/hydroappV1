export const CreateMetafieldDefinition = `#graphql
mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
  metafieldDefinitionCreate(definition: $definition) {
    createdDefinition {
      id
      name
      namespace
      key
      useAsCollectionCondition
    }
    userErrors {
      field
      message
      code
    }
  }
}`

/*

{
  "definition": {
    "name": "Catalog",
    "namespace": "custom",
    "key": "catalog",
    "description": "Catalog catagories breadcrumb",
    "type": "list.single_line_text_field",
    "ownerType": "PRODUCT",
    "useAsCollectionCondition": true
  }
}


*/