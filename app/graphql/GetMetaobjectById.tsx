import {MetaFrag} from './MetaFrag';

export const GetMetaobjectById = `#graphql
query GetMetaobjectById($id: ID!) {
    metaobject(id: $id) {
      ...Meta
  }
}
${MetaFrag}
`;
