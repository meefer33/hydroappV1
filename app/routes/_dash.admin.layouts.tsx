import {
  ActionIcon,
  Button,
  Group,
  Select,
  Table,
  TextInput,
} from '@mantine/core';
import dayjs from 'dayjs/esm/index.js';
import {Form, Link, useActionData, useLoaderData} from '@remix-run/react';
import {RiExternalLinkLine} from '@remixicon/react';
import {ActionFunctionArgs, LoaderFunctionArgs} from '@remix-run/node';

import {parseCmsContent, parseContent} from '~/lib/parseContent';
import {GetMetaobjectsByType} from '~/graphql/GetMetaobjectsByType';
import {CreateMetaobject} from '~/graphql/admin/CreateMetaobject';

export const loader = async ({context}: LoaderFunctionArgs) => {
  const {admin} = context;

  const getMetaobject = await admin.request(GetMetaobjectsByType, {
    variables: {
      type: 'ha_theme_layouts',
    },
  });
  const parsed = parseCmsContent(getMetaobject?.data?.metaobjects?.nodes);

  const getThemeMetaobject = await admin.request(GetMetaobjectsByType, {
    variables: {
      type: 'ha_theme_settings',
    },
  });

  const parsedTheme = parseCmsContent(
    getThemeMetaobject?.data?.metaobjects?.nodes,
  );

  return {parsed, parsedTheme};
};

export async function action({request, context}: ActionFunctionArgs) {
  const {admin} = context;
  const form = await request.formData();
  const name = form.get('name');
  const theme = form.get('theme');

  const createMetaobject = await admin.request(CreateMetaobject, {
    variables: {
      metaobject: {
        type: 'ha_theme_layouts',
        handle: name,
        fields: [
          {key: 'name', value: name},
          {key: 'theme', value: theme},
        ],
      },
    },
  });

  return createMetaobject;
}

export default function Layouts() {
  const data: any = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const selectTheme = data.parsedTheme.map((theme) => ({
    value: theme.id,
    label: theme.displayName,
  }));
  return (
    <>
      <Form method="post">
        <Group align="end" justify="end" p="lg">
          <TextInput
            type="text"
            name="name"
            label="Name"
            withAsterisk
            description="Url friendly, no spaces."
            error={
              !actionData?.data?.metaobjectCreate?.userErrors.length
                ? false
                : true
            }
          />
          <Select
            label="Theme"
            placeholder="Pick Theme"
            name="theme"
            data={selectTheme}
          />
          <Button type="submit">Create Theme</Button>
        </Group>
      </Form>

      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Theme</Table.Th>
            <Table.Th>Created At</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.parsed?.map((layout) => {
            return (
              <Table.Tr key={layout.id}>
                <Table.Td>{layout.displayName}</Table.Td>
                <Table.Td>{layout.fields.theme.displayName}</Table.Td>
                <Table.Td>
                  {dayjs(layout.updatedAt).format('DD-MM-YYYY h:mm a')}
                </Table.Td>
                <Table.Td>
                  <ActionIcon
                    component={Link}
                    to={`/admin/layout/${layout.handle}`}
                    target="_blank"
                    size="sm"
                  >
                    <RiExternalLinkLine />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </>
  );
}
