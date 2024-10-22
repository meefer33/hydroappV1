import {LoaderFunctionArgs, json} from '@remix-run/server-runtime';
import { GetCollections } from '~/graphql/GetCollections';
import { parser } from '~/lib/parseContent';

export const loader = async ({request, context}: LoaderFunctionArgs) => {
  const {storefront} = context;
  const response = await storefront.query(GetCollections);

  return parser(response.collections);
};
