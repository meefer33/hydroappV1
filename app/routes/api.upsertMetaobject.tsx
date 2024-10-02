import type {ActionFunctionArgs} from '@remix-run/node';
import {UpsertMetaobject} from '~/graphql/admin/UpsertMetaobject';

export async function action({request, context}: ActionFunctionArgs) {
  const {admin} = context;
  const data: any = await request.json();
  console.log('incoming data', JSON.stringify(data));
  const response = await admin.request(UpsertMetaobject, {
    variables: {
      handle: data.handle,
      metaobject: data.metaobject,
    },
  });
  console.log(JSON.stringify(response));
  return response;
}
