import {
  ActionIcon,
  Anchor,
  Breadcrumbs,
  Table,
} from '@mantine/core';
import {Link,  useLoaderData} from '@remix-run/react';
import {RiExternalLinkLine} from '@remixicon/react';
import {LoaderFunctionArgs} from '@remix-run/node';
import {getPaginationVariables} from '@shopify/hydrogen';
import {GetCollection} from '~/graphql/GetCollection';

export const loader = async ({
  context,
  params,
  request,
}: LoaderFunctionArgs) => {
  const {admin, storefront} = context;
  let breadcrumb = params['*'];
  let handle = params['*']?.split('/').pop();

  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  const [{collection}] = await Promise.all([
    storefront.query(GetCollection, {
      variables: {handle, ...paginationVariables},
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  return {collection, breadcrumb};
};

export default function CatalogSub() {
  const data: any = useLoaderData<typeof loader>();
 // console.log(data?.collection, data?.breadcrumb);
  const breadcrumbs = data?.breadcrumb.split('/');
  let breadcrumbLink = '/admin/catalog';
  return (
    <>
      <Breadcrumbs separator=">" separatorMargin="sm" p="md">
        <Anchor
          component={Link}
          to={breadcrumbLink}
          underline="never"
          // fz="xs"
        >
          catalog
        </Anchor>
        {breadcrumbs.map((breadcrumb: any) => {
          breadcrumbLink = `${breadcrumbLink}/${breadcrumb}`;
          return (
            <Anchor
              component={Link}
              key={breadcrumb}
              to={breadcrumbLink}
              underline="never"
              // fz="xs"
            >
              {breadcrumb}
            </Anchor>
          );
        })}
      </Breadcrumbs>
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Theme</Table.Th>
            <Table.Th>Created At</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.collection?.products?.nodes.map((product: any) => {
            const catalogMetafield: any = JSON.parse(product.metafield.value);
            return (
              <Table.Tr key={product.id}>
                <Table.Td>{product.title}</Table.Td>
                <Table.Td>{catalogMetafield.join(' | ')}</Table.Td>
                <Table.Td></Table.Td>
                <Table.Td>
                  <ActionIcon
                    component={Link}
                    to={`/admin/product/${product.handle}`}
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
