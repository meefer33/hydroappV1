import {LoaderFunctionArgs, json} from '@remix-run/server-runtime';
import {GetImages} from '~/graphql/admin/GetImages';

export const loader = async ({request, context}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const searchTerm = searchParams.get('search') || '';

  if (!searchTerm) {
    //return null
  }

  const {admin} = context;
  const response = await admin.request(GetImages, {
    variables: {
      search: searchTerm,
    },
  });

  return response;
};
