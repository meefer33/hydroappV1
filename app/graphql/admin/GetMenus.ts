export const GetMenus = `#graphql
query GetMenus {
  menus(first: 10) {
    nodes {
      items(limit: 10) {
        id
        title
        resourceId
        type
        url
        items {
          id
          resourceId
          title
          type
          url
          items {
            id
            resourceId
            title
            type
            url
          }
        }
      }
      title
      handle
      id
    }
  }
}`;