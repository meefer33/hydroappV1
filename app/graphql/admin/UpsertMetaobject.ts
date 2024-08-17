export const UpsertMetaobject = `#graphql
mutation UpsertMetaobject($handle: MetaobjectHandleInput!, $metaobject: MetaobjectUpsertInput!) {
  metaobjectUpsert(
    handle: $handle
    metaobject: $metaobject
  ) {
    metaobject {
      handle
    }
  }
}`;