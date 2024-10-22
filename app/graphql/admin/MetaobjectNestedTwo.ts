import {MetaFragCollection} from './MetaFrag';
import {METAOBJECT_NESTED_THREE} from './MetaobjectNestedThree';

export const METAOBJECT_NESTED_TWO = `#graphql
fragment MetaObjectNestedTwoFragment on Metaobject
{ 
    type
    id
    handle
    fields {
        key
        value
        type
        reference {
            ... on MediaImage {
                image {
                url
                altText
                height
                width
                }
            }
            ... on Video {
            id
                sources {
                    url
                    height
                    width
                    format
                    mimeType
                }
            }
            ... on Product {
                id
                featuredImage {
                    url
                    altText
                    height
                    width
                }
                description
                title
                handle
                variants(first: 1) {
                    nodes {
                        id
                    }
                }
            }
            ... on Collection
                {
                    handle
                    id
                    title
                    description
                    image {
                    url
                    }
                    products(first: 10) {
                    nodes {
                        handle
                        id
                        description(truncateAt: 150)
                        featuredImage {
                        url
                        id
                        altText
                        }
                        title
                        tags
                    }
                    }
                }
          
        }  
        references(first: 100) {
            nodes {
                ... on MediaImage {
                    image {
                    url
                    altText
                    height
                    width
                    }
                }
                ... on Product {
                    id
                    featuredImage {
                        url
                        altText
                        height
                        width
                    }
                    description
                    title
                    handle
                    variants(first: 1) {
                        nodes {
                            id
                        }
                    }
                }
                ... on Collection
                {
                    handle
                    id
                    title
                    description
                    image {
                    url
                    }
                    products(first: 10) {
                    nodes {
                        handle
                        id
                        description(truncateAt: 150)
                        featuredImage {
                        url
                        id
                        altText
                        }
                        title
                        tags
                    }
                    }
                }
               
            }
        }
    }
    
}

` as const;
