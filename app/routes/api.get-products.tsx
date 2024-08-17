import {LoaderFunctionArgs, json} from '@remix-run/server-runtime';
import { GetProducts } from '~/graphql/GetProducts';

export const loader = async ({request, context}: LoaderFunctionArgs) => {
  const {storefront} = context;

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const searchTerm = searchParams.get('query') || '';

  const response = await storefront.query(GetProducts,{
    variables: {
      query: searchTerm
    }
  });

  return response;
};
