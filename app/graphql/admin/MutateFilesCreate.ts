export const MUTATE_FILES_CREATE = `#graphql
mutation fileCreate($files: [FileCreateInput!]!) {
    fileCreate(
        files: $files
      ) {
        files {
          alt
          id
          fileStatus
          preview {
            image {
              url
              width
              height
            }
          }
          fileErrors {
            code
            details
            message
          }
          ... on MediaImage {
            id
            fileStatus
            image {
              url
            }
          }
        }
      }
  }
`