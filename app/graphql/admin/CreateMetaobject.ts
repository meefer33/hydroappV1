import  {MetaFrag}  from "./fragments/MetaFrag";

export const CreateMetaobject = `#graphql
mutation CreateMetaobject($metaobject: MetaobjectCreateInput!) {
    metaobjectCreate(metaobject: $metaobject) {
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
