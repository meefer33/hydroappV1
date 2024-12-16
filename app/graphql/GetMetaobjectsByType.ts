import {MetaFrag} from './admin/fragments/MetaFrag';

export const GetMetaobjectsByType = `#graphql
query GetMetaobjectsByType($type: String!) {
  metaobjects(type: $type, first: 50, sortKey: "updated_at", reverse: true) {
    nodes {
      ...Meta
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
${MetaFrag}
`;
