import type {ActionFunctionArgs} from '@remix-run/node'; // or cloudflare/deno
import {MUTATE_FILES_CREATE} from '~/graphql/admin/MutateFilesCreate';

export const action = async ({request, context}: ActionFunctionArgs) => {
  const {admin} = context;
  const formData = await request.formData();
  const jsondata: any = Object.fromEntries(formData);

  const response = await admin.request(MUTATE_FILES_CREATE, {
    variables: {
      files: {
        originalSource: jsondata.resourceUrl,
        alt: jsondata.alt,
        contentType: 'IMAGE',
      },
    },
  });

  return response;
};
