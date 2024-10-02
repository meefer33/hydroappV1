export const GetProductContent = `#graphql
query GetProductContent($handle: String!) {
  productByHandle(handle: $handle) {
    description
    title
    tags
    media(first: 50) {
      nodes {
        mediaContentType
        id
        preview {
          image {
            id
            height
            altText
            url
            width
          }
        }
      }
    }
    handle
    metafield(key: "content_display", namespace: "custom") {
      jsonValue
      createdAt
      updatedAt
    }
  }
}`;
