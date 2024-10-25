import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  useLoaderData,
  useOutletContext,
  useRouteLoaderData,
  type MetaFunction,
} from '@remix-run/react';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {Container, Grid, Title} from '@mantine/core';
import {GetCollection} from '~/graphql/GetCollection';
import ProductItem from '~/components/ProductItem';
import {GetMetaobjectById} from '~/graphql/admin/GetMetaobjectById';
import {parser} from '~/lib/parseContent';
import {useEffect} from 'react';
import EditorLayout from '~/components/admin/dnd/EditorLayout';
import CatalogMenu from '~/components/CatalogMenu';
import BreadcrumbsCatalog from '~/components/BreadcrumbsCatalog';
import {RootLoader} from '~/root';

export async function loader({context, params, request}: LoaderFunctionArgs) {
  let handle = params['*']?.split('/').pop();
  console.log(handle?.split('/').pop());
  //let {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  if (!handle) {
    handle = 'all';
  }

  const {collection} = await storefront.query(GetCollection, {
    variables: {handle, ...paginationVariables},
    // Add other queries here, so that they are loaded in parallel
  });

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  //get content page
  const getContent = await context.storefront.query(GetMetaobjectById, {
    variables: {id: collection.content?.id},
  });
  const content = parser(getContent?.metaobject);

  return {
    collection,
    content,
  };
}

export default function Collection() {
  const {collection, content} = useLoaderData<typeof loader>();
  const {setEditorContent}: any = useOutletContext();
  const root: any = useRouteLoaderData<RootLoader>('root');
  const catalogMenu = root?.header?.catalog?.items;

  useEffect(() => {
    setEditorContent(content);
  }, [content]);
  return (
    <EditorLayout>
      <Container fluid pt="md">
        <Grid>
          <Grid.Col span={{base: 12, md: 'content'}}>
            <CatalogMenu catalogMenu={catalogMenu} breadcrumb="collections" />
          </Grid.Col>
          <Grid.Col span={{base: 12, md: 'auto'}}>
            <Container size="xl">
              <BreadcrumbsCatalog catalogMenu={catalogMenu} />

              <Title order={1}>{collection.title}</Title>
              <p className="collection-description">{collection.description}</p>
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
    </EditorLayout>
  );
}
