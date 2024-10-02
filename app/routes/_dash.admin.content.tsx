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
import {GetMetaobject} from '~/graphql/admin/GetMetaobject';
import {CreateMetaobject} from '~/graphql/admin/CreateMetaobject';

export const loader = async ({context}: LoaderFunctionArgs) => {
  const {admin} = context;

  const getThemeContent = await admin.request(GetMetaobject, {
    variables: {
      type: 'content',
    },
  });
  const themeContent = parseCmsContent(getThemeContent?.data?.metaobjects?.nodes);

  const getThemeLayouts = await admin.request(GetMetaobject, {
    variables: {
      type: 'ha_theme_layouts',
    },
  });

  const themeLayouts = parseCmsContent(
    getThemeLayouts?.data?.metaobjects?.nodes,
  );

  return {themeContent, themeLayouts};
};

export async function action({request, context}: ActionFunctionArgs) {
  const {admin} = context;
  const form = await request.formData();
  const name = form.get('name');
  const layout = form.get('layout');

  const createMetaobject = await admin.request(CreateMetaobject, {
    variables: {
      metaobject: {
        type: 'content',
        handle: name,
        fields: [
          {key: 'name', value: name},
          {key: 'layout', value: layout},
        ],
      },
    },
  });

  return createMetaobject;
}

export default function Layouts() {
  const data: any = useLoaderData<typeof loader>();
  console.log(data)
  const actionData = useActionData<typeof action>();
  const selectLayout = data.themeLayouts.map((layout:any) => ({
    value: layout.id,
    label: layout.displayName,
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
            label="Layout"
            placeholder="Pick Layout"
            name="layout"
            data={selectLayout}
          />
          <Button type="submit">Create Content</Button>
        </Group>
      </Form>

      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Layout</Table.Th>
            <Table.Th>Created At</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.themeContent?.map((content:any) => {
            return (
              <Table.Tr key={content.id}>
                <Table.Td>{content.displayName}</Table.Td>
                <Table.Td>{content.fields?.layout?.displayName}</Table.Td>
                <Table.Td>
                  {dayjs(content.updatedAt).format('DD-MM-YYYY h:mm a')}
                </Table.Td>
                <Table.Td>
                  <ActionIcon
                    component={Link}
                    to={`/admin/content/${content.handle}`}
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
