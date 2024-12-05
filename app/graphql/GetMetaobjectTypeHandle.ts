import { MetaFrag } from "./admin/fragments/MetaFrag";


export const GetMetaobjectTypeHandle = `#graphql
query GetMetaobjectTypeHandle($handle: String!,$type: String!) {
  metaobject(handle: {handle: $handle, type: $type}) {
   ...Meta
  }
}
${MetaFrag}
`;
