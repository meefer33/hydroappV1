import {
  ActionIcon,
  Button,
  Container,
  Group,
  Table,
  TextInput,
} from '@mantine/core';
import dayjs from 'dayjs/esm/index.js';
import {Form, Link, useActionData, useLoaderData} from '@remix-run/react';
import {RiExternalLinkLine} from '@remixicon/react';
import {ActionFunctionArgs, LoaderFunctionArgs} from '@remix-run/node';
import {GetMetaobjectsByType} from '~/graphql/GetMetaobjectsByType';
import {parseCmsContent} from '~/lib/parseContent';
import {CreateMetaobject} from '~/graphql/admin/CreateMetaobject';

export const loader = async ({context}: LoaderFunctionArgs) => {
  const {admin} = context;

  const getMetaobjectTheme = await admin.request(GetMetaobjectsByType, {
    variables: {
      type: 'themes',
    },
  });
  const parsedTheme = parseCmsContent(
    getMetaobjectTheme?.data?.metaobjects?.nodes,
  );

  const getMetaobjectHa = await admin.request(GetMetaobjectsByType, {
    variables: {
      type: 'ha_theme_settings',
    },
  });
  const parsed = parseCmsContent(getMetaobjectHa?.data?.metaobjects?.nodes);

  return {parsed, parsedTheme};
};

export async function action({request, context}: ActionFunctionArgs) {
  const {admin} = context;
  const form = await request.formData();
  const name = form.get('name');

  const createMetaobject = await admin.request(CreateMetaobject, {
    variables: {
      metaobject: {
        type: 'ha_theme_settings',
        handle: name,
        fields: [
          {key: 'name', value: name},
          //{key: 'settings', value: JSON.stringify(themeSettings)},
        ],
      },
    },
  });

  return createMetaobject;
}

export default function Themes() {
  const data: any = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  console.log(data);
  return (
    <Container size="xl">
      <Group grow>
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
            <Button type="submit" mb="sm">
              Create Theme
            </Button>
          </Group>
        </Form>
      </Group>

      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Created At</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.parsedTheme?.map((theme: any) => {
            return (
              <Table.Tr key={theme.id}>
                <Table.Td>{theme.displayName}</Table.Td>
                <Table.Td>
                  {dayjs(theme.updatedAt).format('MM-DD-YYYY h:mm a')}
                </Table.Td>
                <Table.Td>
                  <ActionIcon
                    component={Link}
                    to={`/admin/themes/${theme.handle}`}
                    //target="_blank"
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

      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Created At</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.parsed?.map((theme: any) => {
            return (
              <Table.Tr key={theme.id}>
                <Table.Td>{theme.displayName}</Table.Td>
                <Table.Td>
                  {dayjs(theme.updatedAt).format('MM-DD-YYYY h:mm a')}
                </Table.Td>
                <Table.Td>
                  <ActionIcon
                    component={Link}
                    to={`/admin/theme/${theme.handle}`}
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
    </Container>
  );
}
