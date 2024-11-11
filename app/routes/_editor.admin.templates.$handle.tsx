import {LoaderFunctionArgs} from '@remix-run/node';
import {useLoaderData, useOutletContext} from '@remix-run/react';
import {parser} from '~/lib/parseContent';
import EditorLayout from '~/components/admin/dnd/EditorLayout';
import {GetMetaobjectTypeHandle} from '~/graphql/GetMetaobjectTypeHandle';
import DndContent from '~/components/admin/dnd/DndContent';
import { Container, Grid } from '@mantine/core';
import CatalogMenu from '~/components/CatalogMenu';
import BreadcrumbsCatalog from '~/components/BreadcrumbsCatalog';


export const loader = async ({context, params}: LoaderFunctionArgs) => {
  const {admin} = context;
  let handle = params.handle;

  //get content page
  const {metaobject} = await context.storefront.query(GetMetaobjectTypeHandle, {
    variables: {type: 'templates', handle: handle},
    cache: context.storefront.CacheNone(),
  });
  const meta = parser(metaobject);

  return {meta};
};

export default function EditContent() {
  const {meta}: any = useLoaderData<typeof loader>();


  return (
    <EditorLayout>
      <Container fluid pt="md">
        <Grid
        type="container"
          breakpoints={{
            xs: '36em',
            sm: '36em',
            md: '36em',
            lg: '48em',
            xl: '48em',
          }}
        >
          <Grid.Col span={{base: 12, md: 'content'}}>
            <CatalogMenu catalogMenu={catalogMenu} breadcrumb="collections" />
          </Grid.Col>
          <Grid.Col span={{base: 12, md: 'auto'}}>
            <Container size="xl">
              <BreadcrumbsCatalog catalogMenu={catalogMenu} />

            </Container>
          </Grid.Col>
        </Grid>
      </Container>
    </EditorLayout>
  );
}

