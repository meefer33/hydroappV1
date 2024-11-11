import type {ActionFunctionArgs} from '@remix-run/node';
import { UpdateMetaobjectPage } from '~/graphql/admin/UpdateMetaobjectPage';
import {parser} from '~/lib/parseContent';

export async function action({request, context}: ActionFunctionArgs) {
  const {admin} = context;
  const data: any = await request.json();

  const response = await admin.request(UpdateMetaobjectPage, {
    variables: {
      id: data.id,
      metaobject: data.metaobject,
    },
  });
  //console.log('wtf',JSON.stringify(response))
  return parser(response?.data?.metaobjectUpdate?.metaobject) || null;
}
