import {LoaderFunctionArgs} from '@remix-run/server-runtime';
import { GetMetaobjectByHandle } from '~/graphql/admin/GetMetaobjectByHandle';
import { GetMetaobjectById } from '~/graphql/admin/GetMetaobjectById';
import { GetMetaobjectTypeHandle } from '~/graphql/GetMetaobjectTypeHandle';
import { parser } from '~/lib/parseContent';

export const loader = async ({request, context}: LoaderFunctionArgs) => {
  const {admin} = context;

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const handle = searchParams.get('handle') || '';

  const response = await context.storefront.query(GetMetaobjectTypeHandle, {
    variables: {type: 'content', handle: handle},
    cache: context.storefront.CacheNone()
  });

  return parser(response.metaobject);
};
