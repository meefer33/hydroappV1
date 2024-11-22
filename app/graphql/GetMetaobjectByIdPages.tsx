import {MetaFrag} from './MetaFrag';

export const GetMetaobjectByIdPages = `#graphql
query GetMetaobjectByIdPages($id: ID!) {
    metaobject(id: $id) {
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
}
${MetaFrag}
`;