import {METAOBJECT_NESTED_ONE} from './MetaobjectNestedOne';

export const METAOBJECT_NESTED = `#graphql
query MetaobjectNested($id: ID!) {
    metaobject(id: $id) {
        handle
        id
        fields {
            key
            value
            type
            reference {
                ...MetaObjectNestedOneFragment
            }
            references(first: 100) {
                nodes {
                    ...MetaObjectNestedOneFragment
                }
            }
        }
    }
}
  ${METAOBJECT_NESTED_ONE}
` as const;
