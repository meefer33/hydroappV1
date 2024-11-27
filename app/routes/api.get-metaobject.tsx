import {LoaderFunctionArgs} from '@remix-run/server-runtime';
import {GetMetaobjectById} from '~/graphql/GetMetaobjectById';
import {parser} from '~/lib/parseContent';

export const loader = async ({request, context}: LoaderFunctionArgs) => {
  const {admin,storefront} = context;

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const id = searchParams.get('id') || '';

  const response = await storefront.query(GetMetaobjectById, {
    variables: {
      id: id,
    },
    cache: storefront.CacheCustom({
      mode: 'must-revalidate, no-store',
      maxAge: 1,
    })
  });

  return parser(response?.metaobject);
};
