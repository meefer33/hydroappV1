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
import {GetMetaobject} from '~/graphql/admin/GetMetaobject';
import {parseCmsContent} from '~/lib/parseContent';
import {CreateMetaobject} from '~/graphql/admin/CreateMetaobject';
import {themeSettings} from '~/components/admin/puck/themesettings';

export const loader = async ({context}: LoaderFunctionArgs) => {
  const {admin} = context;

  const getMetaobject = await admin.request(GetMetaobject, {
    variables: {
      type: 'ha_theme_settings',
    },
  });
  //const getMetaobjectJson = await getMetaobject.json();
  const parsed = parseCmsContent(getMetaobject?.data?.metaobjects?.nodes);

  return parsed;
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
          {key: 'settings', value: JSON.stringify(themeSettings)},
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
          {data?.map((theme) => {
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
