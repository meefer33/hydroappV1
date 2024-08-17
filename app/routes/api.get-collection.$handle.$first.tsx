import {LoaderFunctionArgs, json} from '@remix-run/server-runtime';
import { getPaginationVariables } from '@shopify/hydrogen';
import { GetCollection } from '~/graphql/GetCollection';
import { GetCollections } from '~/graphql/GetCollections';

export const loader = async ({request, context, params}: LoaderFunctionArgs) => {
  const {handle,first} = params;
  const {storefront} = context;
console.log("first",first)
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 2,
  });
  
  const response = await storefront.query(GetCollection,{
    variables: {handle: handle,first: Number(first)},
  });

  return response;
};
