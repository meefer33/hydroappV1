import {useLoaderData} from '@remix-run/react';
import {LoaderFunctionArgs, redirect} from '@remix-run/server-runtime';
import {
  defaultLayout,
  defaultTheme,
} from '~/components/admin/dnd/theme/lib/theme';
import {CreateMetafieldDefinition} from '~/graphql/admin/CreateMetafieldDefinition';
import {CreateMetaobjectDefinition} from '~/graphql/admin/CreateMetaobjectDefinition';
import {UpsertMetaobject} from '~/graphql/admin/UpsertMetaobject';

export const loader = async ({request, context}: LoaderFunctionArgs) => {
  const {admin} = context;

  const themes = await admin.request(UpsertMetaobject, {
    variables: {
      handle: {type: 'themes', handle: 'default'},
      metaobject: {
        fields: [
          {
            key: 'name',
            value: 'default',
          },
          {
            key: 'theme',
            value: JSON.stringify(defaultTheme),
          },
        ],
      },
    },
  });

  const layouts = await admin.request(UpsertMetaobject, {
    variables: {
      handle: {type: 'layouts', handle: 'default'},
      metaobject: {
        fields: [
          {
            key: 'name',
            value: 'default',
          },
          {
            key: 'layout',
            value: JSON.stringify(defaultLayout),
          },
          {
            key: 'theme',
            value: themes.data?.metaobjectUpsert?.metaobject?.id,
          },
        ],
      },
    },
  });

  return redirect('/admin/editor');
};

export default function Setup() {
  const data: any = useLoaderData<typeof loader>();
  if (data?.userErrors) {
  }
  console.log('settings', data);
  return <>Error!!</>;
}
