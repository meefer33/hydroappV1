import {type ActionFunctionArgs} from '@remix-run/node';
import { createTheme } from '~/lib/metaLoaderUtils';

export async function action({request, context}: ActionFunctionArgs) {
  const {admin} = context;
  const data: any = await request.json();

  return await createTheme({admin,name:data.name})
}
