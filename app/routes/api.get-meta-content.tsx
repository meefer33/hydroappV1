import {LoaderFunctionArgs} from '@remix-run/server-runtime';
import { GetMetaobjectTypeHandle } from '~/graphql/GetMetaobjectTypeHandle';
import { parser } from '~/lib/parseContent';

export const loader = async ({request, context}: LoaderFunctionArgs) => {
  const {storefront} = context;

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const handle = searchParams.get('handle') || '';

  const response = await storefront.query(GetMetaobjectTypeHandle, {
    variables: {type: 'content', handle: handle},
    cache: storefront.CacheCustom({
      mode: 'must-revalidate, no-store',
      maxAge: 1,
    })
  });

  return parser(response.metaobject);
};
