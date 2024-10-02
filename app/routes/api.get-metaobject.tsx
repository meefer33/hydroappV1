import {LoaderFunctionArgs} from '@remix-run/server-runtime';
import { GetMetaobjectByHandle } from '~/graphql/admin/GetMetaobjectByHandle';

export const loader = async ({request, context}: LoaderFunctionArgs) => {
  const {admin} = context;

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const type = searchParams.get('type') || '';
  const handle = searchParams.get('handle') || '';

  const response = await admin.request(GetMetaobjectByHandle, {
    variables: {
      handle: {type: type, handle: handle},
    },
  });

  return response;
};
