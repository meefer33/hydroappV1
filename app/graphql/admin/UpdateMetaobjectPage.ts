import {MetaFrag} from '../MetaFrag';

export const UpdateMetaobjectPage = `#graphql
mutation UpdateMetaobjectPage($id: ID!, $metaobject: MetaobjectUpdateInput!) {
  metaobjectUpdate(
    id: $id,
    metaobject: $metaobject
  ) {
    metaobject {
      handle
      id
      type
      fields {
        key
        type
        value
        reference {
          ...Meta
        }
      }
    }
    userErrors {
      field
      message
      code
    }
  }
}
${MetaFrag}
`;
