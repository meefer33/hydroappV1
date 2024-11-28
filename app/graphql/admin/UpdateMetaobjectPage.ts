import { MetaFrag } from "./fragments/MetaFrag";


export const UpdateMetaobjectPage = `#graphql
mutation UpdateMetaobjectPage($id: ID!, $metaobject: MetaobjectUpdateInput!) {
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
