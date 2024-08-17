export const UpdateMetaobject = `#graphql
mutation UpdateMetaobject($id: ID!, $metaobject: MetaobjectUpdateInput!) {
  metaobjectUpdate(
    id: $id,
    metaobject: $metaobject
  ) {
    metaobject {
      handle
    }
    userErrors {
      field
      message
      code
    }
  }
}`;