import {LoaderFunctionArgs, json} from '@remix-run/server-runtime';
import { GetCollections } from '~/graphql/GetCollections';
import { getMetaobjectsByType } from '~/lib/metaLoaderUtils';
import { parser } from '~/lib/parseContent';

export const loader = async ({params, context}: LoaderFunctionArgs) => {
  const {storefront} = context;
  const {type} = params;

  const response = await getMetaobjectsByType({storefront,type:type});

  return response;
};
