import {MetaFrag} from './MetaFrag';

export const UpdateMetaobject = `#graphql
mutation UpdateMetaobject($id: ID!, $metaobject: MetaobjectUpdateInput!) {
  metaobjectUpdate(
    id: $id,
    metaobject: $metaobject
  ) {
    metaobject {
      ...Meta
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
