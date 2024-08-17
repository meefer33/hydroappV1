export const CreateMetaobject = `#graphql
mutation CreateMetaobject($metaobject: MetaobjectCreateInput!) {
    metaobjectCreate(metaobject: $metaobject) {
        metaobject {
        id
        handle
        }
        userErrors {
        field
        message
        code
        }
  }
}`;
