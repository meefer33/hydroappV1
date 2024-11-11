import {MetaFrag} from '../MetaFrag';
export const UpsertMetaobject = `#graphql
mutation UpsertMetaobject($handle: MetaobjectHandleInput!, $metaobject: MetaobjectUpsertInput!) {
  metaobjectUpsert(
    handle: $handle
    metaobject: $metaobject
  ) {
    metaobject {
      ...Meta
    }
    userErrors {
      code
      field
      message
      elementIndex
      elementKey
    }
  }
}
${MetaFrag}
`;