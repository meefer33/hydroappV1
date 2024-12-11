export const METAOBJECTS_DEFINITIONS =  `#graphql
query MetaDefs {
    metaobjectDefinitions(first: 100) {
      nodes {
        name
        type
        displayNameKey
        fieldDefinitions {
          key
          name
          type {
            name
            category
          }
          required
          validations {
            name
            type
            value
          }
          description
        }
        description
        hasThumbnailField
        id
        metaobjectsCount
      }
    }
  }
`