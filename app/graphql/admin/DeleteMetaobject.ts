export const DeleteMetaobject = `#graphql
mutation DeleteMetaobject($id: ID!) {
  metaobjectDelete(id: $id) 
  {
    deletedId
    userErrors {
      code
      elementIndex
      elementKey
      field
      message
    }
  }
}`;
