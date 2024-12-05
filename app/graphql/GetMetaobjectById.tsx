import { MetaFrag } from "./admin/fragments/MetaFrag";


export const GetMetaobjectById = `#graphql
query GetMetaobjectById($id: ID!) {
    metaobject(id: $id) {
      ...Meta
  }
}
${MetaFrag}
`;
