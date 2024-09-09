import { PRODUCT_VARIANT_FRAGMENT } from "./ProductVariantFragment";

export const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    images(first: 20) {
      nodes {
        url(transform: { maxHeight: 600, maxWidth: 550 })
        width
        height
        altText
        id
      }
    }
    options {
      name
      optionValues {
        id
        name
      }
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;