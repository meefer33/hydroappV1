import type {ActionFunctionArgs} from '@remix-run/node'; // or cloudflare/deno
import {MUTATE_STAGES_UPLOADS_CREATE} from '~/graphql/admin/MutateStagedUploadsCreate';

export const action = async ({request, context}: ActionFunctionArgs) => {
  const {admin} = context;
  const formData = await request.formData();
  const jsondata: any = Object.fromEntries(formData);

  const response = await admin.request(MUTATE_STAGES_UPLOADS_CREATE, {
    variables: {
      input: JSON.parse(jsondata.files),
    },
  });

  return response;
};
