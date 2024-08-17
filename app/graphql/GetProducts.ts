export const GetProducts = `#graphql
query GetProducts($query:String) 
{
  products(first: 200, query: $query) {
    nodes {
      handle
      id
      featuredImage {
        url(transform: {maxHeight: 400})
      }
      variants(first: 1) {
        nodes {
          price {
            amount
            currencyCode
          }
        }
      }
      title
      onlineStoreUrl
      description(truncateAt: 150)
    }
  }
}
` as const;
