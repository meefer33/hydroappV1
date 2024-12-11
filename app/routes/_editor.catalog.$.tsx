import {LoaderFunctionArgs} from '@remix-run/server-runtime';
import {useLoaderData, useRouteLoaderData} from '@remix-run/react';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {Container, Grid, Title} from '@mantine/core';
import {GetCollection} from '~/graphql/GetCollection';
import ProductItem from '~/components/ProductItem';
import CatalogMenu from '~/components/CatalogMenu';
import BreadcrumbsCatalog from '~/components/BreadcrumbsCatalog';
import PageContent from '~/components/admin/dnd/PageContent';
import { RootLoader } from '~/root';
import { loadPageContent } from '~/lib/metaLoaderUtils';

export async function loader({context, params, request}: LoaderFunctionArgs) {
  let handle = params['*']?.split('/').pop();
  let name = `catalog/${params['*']}`;
  let slug = `catalog-${params['*'].replaceAll('/', '-')}`;
  const {storefront, admin} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  if (!handle) {
    handle = 'all';
  }

  const {collection} = await storefront.query(GetCollection, {
    variables: {handle, ...paginationVariables},
  });

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  const loadPage = await loadPageContent({admin,type:"collection",typeId:collection.id,slug:slug,name:name,metafieldValue:collection?.page_content?.value})

  return {
    collection,
    loadPage,
  };
}

export default function Collection() {
  const {collection, loadPage}: any = useLoaderData<typeof loader>();
  const root: any = useRouteLoaderData<RootLoader>('root');
  const catalogMenu = root?.header?.catalog?.items;

  return (
    <>
      <PageContent type="page" loadPage={loadPage}>
        <Container size={'lg'}>
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
              <CatalogMenu catalogMenu={catalogMenu} breadcrumb="catalog" />
            </Grid.Col>
            <Grid.Col span={{base: 12, md: 'auto'}}>
              <Container size="xl">
                <BreadcrumbsCatalog catalogMenu={catalogMenu} />

                <Title order={1}>{collection.title}</Title>
                <p className="collection-description">
                  {collection.description}
                </p>
                <PaginatedResourceSection
                  connection={collection.products}
                  resourcesClassName="products-grid"
                >
                  {({node: product, index}: any) => (
                    <ProductItem
                      key={product?.id}
                      product={product}
                      loading={index < 8 ? 'eager' : undefined}
                    />
                  )}
                </PaginatedResourceSection>
                <Analytics.CollectionView
                  data={{
                    collection: {
                      id: collection.id,
                      handle: collection.handle,
                    },
                  }}
                />
              </Container>
            </Grid.Col>
          </Grid>
        </Container>
      </PageContent>
    </>
  );
}
