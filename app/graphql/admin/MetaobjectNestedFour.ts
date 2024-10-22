export const METAOBJECT_NESTED_FOUR = `#graphql
fragment MetaObjectNestedFourFragment on Metaobject
{ 
    type
    id
    handle
    fields {
        key
        value

    }
}` as const;
