export const GET_LAYOUT = `#graphql
query settings {
  metaobject(handle: {handle: "main", type: "ha_theme_layouts"}) {
    layout: field(key: "layout") {
      value
    }
    theme: field(key: "theme") {
      reference {
        ... on Metaobject {
          settings: field(key: "settings") {
            value
          }
        }
      }
    }
  }
}`;
