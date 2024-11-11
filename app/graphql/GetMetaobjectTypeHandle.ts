import {MetaFrag} from './MetaFrag';

export const GetMetaobjectTypeHandle = `#graphql
query GetMetaobjectTypeHandle($handle: String!,$type: String!) {
  metaobject(handle: {handle: $handle, type: $type}) {
   ...Meta
  }
}
${MetaFrag}
`;
