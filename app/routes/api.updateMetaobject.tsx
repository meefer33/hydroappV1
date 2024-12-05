import type {ActionFunctionArgs} from '@remix-run/node';
import {UpdateMetaobject} from '~/graphql/admin/UpdateMetaobject';
import {parser} from '~/lib/parseContent';

export async function action({request, context}: ActionFunctionArgs) {
  const {admin} = context;
  const data: any = await request.json();

  const response = await admin.request(UpdateMetaobject, {
    variables: {
      id: data.id,
      metaobject: data.metaobject,
    },
  });

  return parser(response?.data?.metaobjectUpdate?.metaobject) || null;
}
