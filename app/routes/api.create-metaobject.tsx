import type {ActionFunctionArgs} from '@remix-run/node';
import { CreateMetaobject } from '~/graphql/admin/CreateMetaobject';

export async function action({request, context}: ActionFunctionArgs) {
  const {admin} = context;
  const data: any = await request.json();

  const response = await admin.request(CreateMetaobject, {
    variables: {
      metaobject: {type: data.type, capabilities: {publishable: {status: 'ACTIVE'}}},
    },
  });

  return response;
}
