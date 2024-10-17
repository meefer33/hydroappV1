import type {ActionFunctionArgs} from '@remix-run/node';
import { CreateMetaobject } from '~/graphql/admin/CreateMetaobject';
import { DeleteMetaobject } from '~/graphql/admin/DeleteMetaobject';

export async function action({request, context}: ActionFunctionArgs) {
  const {admin} = context;
  const data: any = await request.json();

  const response = await admin.request(DeleteMetaobject, {
    variables: {
      id: data.id,
    },
  });

  return response;
}
