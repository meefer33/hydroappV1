import {
  ActionIcon,
  Button,
  Container,
  Group,
  Select,
  Table,
  TextInput,
} from '@mantine/core';
import dayjs from 'dayjs/esm/index.js';
import {Form, Link, useActionData, useLoaderData} from '@remix-run/react';
import {RiExternalLinkLine} from '@remixicon/react';
import {ActionFunctionArgs, LoaderFunctionArgs} from '@remix-run/node';
import {GetMetaobjectsByType} from '~/graphql/GetMetaobjectsByType';
import {parseCmsContent, parser} from '~/lib/parseContent';
import {CreateMetaobject} from '~/graphql/admin/CreateMetaobject';

export const loader = async ({context}: LoaderFunctionArgs) => {
  const {admin} = context;

  const {metaobjects}: any = await admin.request(GetMetaobjectsByType, {
    variables: {
      type: 'templates',
    },
  });
  const meta = parser(metaobjects);

  return {meta};
};

export async function action({request, context}: ActionFunctionArgs) {
  const {admin} = context;
  const form = await request.formData();
  const name = form.get('name');
  const resource = form.get('resource');

  const createMetaobject = await admin.request(CreateMetaobject, {
    variables: {
      metaobject: {
        type: 'themes',
        handle: name,
        fields: [
          {key: 'name', value: name},
          {key: 'resource', value: resource},
        ],
      },
    },
  });

  return createMetaobject;
}

export default function Themes() {
  const data: any = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  //console.log(data);
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
              description=""
              error={
                !actionData?.data?.metaobjectCreate?.userErrors.length
                  ? false
                  : true
              }
            />
            <Select
              label="Resource"
              placeholder="Pick Resource"
              name="resource"
              data={['Collection','Product','Page','Blog']}
            />
            <Button type="submit" mb="sm">
              Create Template
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
          {data?.meta?.map((template: any) => {
            return (
              <Table.Tr key={template?.id}>
                <Table.Td>{template?.handle}</Table.Td>
                <Table.Td>
                  {dayjs(template?.updatedAt).format('MM-DD-YYYY h:mm a')}
                </Table.Td>
                <Table.Td>
                  <ActionIcon
                    component={Link}
                    to={`/admin/themes/${template.handle}`}
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
    </Container>
  );
}
