import {LoaderFunctionArgs} from '@remix-run/server-runtime';
import { GetMetaobjectByHandle } from '~/graphql/admin/GetMetaobjectByHandle';
import { GetMetaobjectById } from '~/graphql/admin/GetMetaobjectById';
import { parser } from '~/lib/parseContent';

export const loader = async ({request, context}: LoaderFunctionArgs) => {
  const {admin} = context;

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const id = searchParams.get('id') || '';

  const response = await admin.request(GetMetaobjectById, {
    variables: {
      id: id,
    },
  });
  
  return parser(response.data.metaobject);
};
