import {MetaFrag} from './MetaFrag';

export const GetMetaobjectsByType = `#graphql
query GetMetaobjectsByType($type: String!) {
  metaobjects(type: $type, first: 100, sortKey: "updated_at", reverse: true) {
    nodes {
      ...Meta
    }
  }
}
${MetaFrag}
`;
