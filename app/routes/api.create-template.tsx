import {redirect, type ActionFunctionArgs} from '@remix-run/node';
import { createTemplate } from '~/lib/metaLoaderUtils';

export async function action({request, context}: ActionFunctionArgs) {
  const {admin} = context;
  const data: any = await request.json();

  return await createTemplate({admin,name:data.name,themeId:data.themeId})
}
