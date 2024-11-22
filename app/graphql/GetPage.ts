import {MetaFrag} from './MetaFrag';

export const GetPage = `#graphql
query GetPage($handle:String!) { 
  page(handle: $handle) {
    handle
    title
    id
    body
    seo {
      description
      title
    }
    updatedAt
    page_content: metafield(key: "page_content", namespace: "custom") {
      id
      value
    }
  }
}

`;
