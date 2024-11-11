import {MetaFrag} from './MetaFrag';

export const GetPage = `#graphql
query GetPage($handle:String!) { 
  page(handle: $handle) {
    handle
    title
    seo {
      description
      title
    }
    updatedAt
    metafield(key: "content", namespace: "custom") {
      id
      value
    }
    template: metafield(key: "template", namespace: "custom") {
      id
      value
    }
  }
}

`;
