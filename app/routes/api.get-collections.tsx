import {LoaderFunctionArgs, json} from '@remix-run/server-runtime';
import { GetCollections } from '~/graphql/GetCollections';

export const loader = async ({request, context}: LoaderFunctionArgs) => {
  const {storefront} = context;
  const response = await storefront.query(GetCollections);

  return response;
};
