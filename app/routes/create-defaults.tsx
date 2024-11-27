import {useLoaderData} from '@remix-run/react';
import {LoaderFunctionArgs, redirect} from '@remix-run/server-runtime';
import { createTemplate, createTheme } from '~/lib/metaLoaderUtils';

export const loader = async ({request, context}: LoaderFunctionArgs) => {
  const {admin} = context;

  let defaultTheme = await createTheme({admin,name:'Default Theme'})
  let defaultTemplate = await createTemplate({admin,name:'Default Template',themeId:defaultTheme?.data?.metaobjectCreate?.metaobject?.id})

  return null;
};

export default function Setup() {
  const data: any = useLoaderData<typeof loader>();
  if (data?.userErrors) {
  }
  console.log('settings', data);
  return <>Error!!</>;
}
