
import { useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs, redirect } from '@remix-run/server-runtime';
import {CreateMetaobjectDefinition} from '~/graphql/admin/CreateMetaobjectDefinition';

export const loader = async ({request, context}: LoaderFunctionArgs) => {
  const {admin} = context;

  const createMetaobject = await admin.request(CreateMetaobjectDefinition, {
    variables: {
      definition: {
        name: 'Theme Settings',
        type: 'ha_theme_settings',
        displayNameKey: 'name',
        access: {
          storefront: 'PUBLIC_READ',
        },
        capabilities: {
          publishable: {
            enabled: true,
          },
        },
        fieldDefinitions: [
          {
            name: 'Name',
            key: 'name',
            type: 'single_line_text_field',
            required: true,
          },
          {
            name: 'Settings',
            key: 'settings',
            type: 'json',
            required: true,
          },
        ],
      },
    },
  });

  if (
    createMetaobject?.data?.metaobjectDefinitionCreate?.userErrors.length > 0
  ) {
    return {
      userErrors:
        createMetaobject?.data?.metaobjectDefinitionCreate?.userErrors,
    };
  }

  const createMetaobject1 = await admin.request(CreateMetaobjectDefinition, {
    variables: {
      definition: {
        name: 'Layout Settings',
        type: 'ha_theme_layouts',
        displayNameKey: 'name',
        access: {
          storefront: 'PUBLIC_READ',
        },
        capabilities: {
          publishable: {
            enabled: true,
          },
        },
        fieldDefinitions: [
          {
            name: 'Name',
            key: 'name',
            type: 'single_line_text_field',
            required: true,
          },
          {
            name: 'Layout',
            key: 'layout',
            type: 'json',
            required: false,
          },
          {
            name: 'Theme',
            key: 'theme',
            type: 'metaobject_reference',
            required: true,
            validations: {
              name: 'metaobject_definition_id',
              value:
                createMetaobject?.data?.metaobjectDefinitionCreate
                  ?.metaobjectDefinition.id,
            },
          },
        ],
      },
    },
  });
  if (
    createMetaobject1?.data?.metaobjectDefinitionCreate?.userErrors.length > 0
  ) {
    return {
      userErrors:
        createMetaobject1?.data?.metaobjectDefinitionCreate?.userErrors,
    };
  }

  const createMetaobject2 = await admin.request(CreateMetaobjectDefinition, {
    variables: {
      definition: {
        name: 'Content',
        type: 'ha_theme_content',
        displayNameKey: 'name',
        access: {
          storefront: 'PUBLIC_READ',
        },
        capabilities: {
          publishable: {
            enabled: true,
          },
        },
        fieldDefinitions: [
          {
            name: 'Name',
            key: 'name',
            type: 'single_line_text_field',
            required: true,
          },
          {
            name: 'Content',
            key: 'content',
            type: 'json',
            required: false,
          },
          {
            name: 'Layout',
            key: 'layout',
            type: 'metaobject_reference',
            required: true,
            validations: {
              name: 'metaobject_definition_id',
              value:
                createMetaobject1?.data?.metaobjectDefinitionCreate
                  ?.metaobjectDefinition.id,
            },
          },
        ],
      },
    },
  });
  if (
    createMetaobject2?.data?.metaobjectDefinitionCreate?.userErrors.length > 0
  ) {
    return {
      userErrors:
        createMetaobject2?.data?.metaobjectDefinitionCreate?.userErrors,
    };
  }

  return redirect('/');
};

export default function Setup() {
  const data: any = useLoaderData<typeof loader>();
  if (data?.userErrors) {
  }
  console.log('settings', data);
  return <>Error!!</>;
}
