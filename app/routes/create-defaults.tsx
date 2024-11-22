import {useLoaderData} from '@remix-run/react';
import {LoaderFunctionArgs, redirect} from '@remix-run/server-runtime';
import {
  defaultLayout,
  defaultTheme,
} from '~/components/admin/dnd/theme/lib/theme';
import { CreateMetaobject } from '~/graphql/admin/CreateMetaobject';
import {UpsertMetaobject} from '~/graphql/admin/UpsertMetaobject';

export const loader = async ({request, context}: LoaderFunctionArgs) => {
  const {admin} = context;

  const themes = await admin.request(UpsertMetaobject, {
    variables: {
      handle: {type: 'themes', handle: 'default-theme'},
      metaobject: {
        capabilities: {publishable: {status: 'ACTIVE'}},
        fields: [
          {
            key: 'name',
            value: 'Default Theme',
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
      handle: {type: 'layouts', handle: 'default-layout'},
      metaobject: {
        capabilities: {publishable: {status: 'ACTIVE'}},
        fields: [
          {
            key: 'name',
            value: 'Default Layout',
          },
          {
            key: 'settings',
            value: JSON.stringify(defaultLayout),
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

  const createMetaobject1 = await admin.request(CreateMetaobject, {
    variables: {
      metaobject: {
        type: 'content',
        capabilities: {publishable: {status: 'ACTIVE'}}, 
        fields: [
          {
            key: 'name',
            value: 'Default Template Top Content'
          },
        ]
      },
    },
  });
  const createMetaobject2 = await admin.request(CreateMetaobject, {
    variables: {
      metaobject: {
        type: 'content',
        capabilities: {publishable: {status: 'ACTIVE'}},
        fields: [
          {
            key: 'name',
            value: 'Default Template Bottom Content'
          },
        ]
      },
    },
  });

  const templates = await admin.request(UpsertMetaobject, {
    variables: {
      handle: {type: 'templates', handle: 'default-template'},
      metaobject: {
        capabilities: {publishable: {status: 'ACTIVE'}},
        fields: [
          {
            key: 'name',
            value: 'Default Template',
          },
          {
            key: 'theme',
            value: themes.data?.metaobjectUpsert?.metaobject?.id,
          },
          {
            key: 'layout',
            value: layouts.data?.metaobjectUpsert?.metaobject?.id,
          },
          {
            key: 'top',
            value: createMetaobject1.data?.metaobjectCreate?.metaobject?.id,
          },
          {
            key: 'bottom',
            value: createMetaobject2.data?.metaobjectCreate?.metaobject?.id,
          },
        ],
      },
    },
  });

  return redirect('/templates');
};

export default function Setup() {
  const data: any = useLoaderData<typeof loader>();
  if (data?.userErrors) {
  }
  console.log('settings', data);
  return <>Error!!</>;
}
