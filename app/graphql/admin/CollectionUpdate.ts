export const CollectionUpdate = `#graphql
mutation CollectionUpdate($input: CollectionInput!) {
  collectionUpdate(input: $input) {
    collection {
      id
    }
  }
}`;


