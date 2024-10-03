export const GetLayoutTheme = `#graphql
query GetLayoutTheme($handle: String!) {
  metaobject(handle: {handle: $handle, type: "ha_theme_layouts"}) {
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