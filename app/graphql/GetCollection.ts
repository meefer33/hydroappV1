const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    description(truncateAt: 150)
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        selectedOptions {
          name
          value
        }
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
export const GetCollection = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query GetCollection(
    $handle: String!
    $first: Int
  ) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
      ) {
        nodes {
          ...ProductItem
        }
      }
    }
  }
` as const;