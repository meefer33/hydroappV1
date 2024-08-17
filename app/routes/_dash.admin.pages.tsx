import {ActionIcon, Table} from '@mantine/core';
import {LoaderFunctionArgs} from '@remix-run/node';
import {Link, useLoaderData} from '@remix-run/react';
import {GetPages} from '~/graphql/GetPages';
import dayjs from 'dayjs/esm/index.js';
import {RiExternalLinkLine} from '@remixicon/react';

export const loader = async ({context}: LoaderFunctionArgs) => {
  const {storefront} = context;

  const getPages = await storefront.query(GetPages);

  return getPages;
};

export default function PagessLayout() {
  const data: any = useLoaderData<typeof loader>();
  return (
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>ID</Table.Th>
          <Table.Th>Title</Table.Th>
          <Table.Th>Created At</Table.Th>
          <Table.Th>Published At</Table.Th>
          <Table.Th>Updated At</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data?.pages?.nodes?.map((page) => {
          return (
            <Table.Tr key={page.id}>
              <Table.Td>{page.id}</Table.Td>
              <Table.Td>{page.title}</Table.Td>
              <Table.Td>
                {dayjs(page.createdAt).format('MM-DD-YYYY h:mm a')}
              </Table.Td>
              <Table.Td>
                {dayjs(page.updatedAt).format('MM-DD-YYYY h:mm a')}
              </Table.Td>
              <Table.Td>
                <ActionIcon
                  component={Link}
                  to={`/admin/page/${page.handle}`}
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
  );
}

export const handle = {
  breadcrumb: () => <span>Pages</span>,
};
