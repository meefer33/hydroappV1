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
import {GetMetaobjectById} from '~/graphql/GetMetaobjectById';
import {parser} from '~/lib/parseContent';
import {useEffect} from 'react';
import EditorLayout from '~/components/admin/dnd/EditorLayout';
import CatalogMenu from '~/components/CatalogMenu';
import BreadcrumbsCatalog from '~/components/BreadcrumbsCatalog';
import {RootLoader} from '~/root';
import DndContent from '~/components/admin/dnd/DndContent';
import {CreateMetaobject} from '~/graphql/admin/CreateMetaobject';
import {UpsertMetaobject} from '~/graphql/admin/UpsertMetaobject';
import {CollectionUpdate} from '~/graphql/admin/CollectionUpdate';
import {identity} from 'node_modules/@mantine/core/lib/core/factory/factory';

export async function loader({context, params, request}: LoaderFunctionArgs) {
  let handle = params['*']?.split('/').pop();
  let name = `catalog/${params['*']}`;
  let slug = `catalog-${params['*'].replaceAll('/', '-')}`;
  //let {handle} = params;
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

  //get page in pages metaobject
  let getPage: any = {},
    page: any = {};
  if (collection?.page_template?.value) {
    getPage = await admin.request(GetMetaobjectById, {
      variables: {id: collection?.page_template?.value},
    });

    page = parser(getPage?.metaobject);
  } else {
    //create page in pages metaobject
    const upsertPage = await admin.request(UpsertMetaobject, {
      variables: {
        handle: {
          type: 'pages',
          handle: slug,
        },
        metaobject: {
          fields: [
            {key: 'name', value: name},
            {key: 'slug', value: name},
          ],
        },
      },
    });
    const pageId = upsertPage?.data?.metaobjectUpsert?.metaobject?.id;
    page = upsertPage?.data?.metaobjectUpsert?.metaobject
    //add page_template metaobject to collection
    const addMetafield = await admin.request(CollectionUpdate, {
      variables: {
        input: {
          id: collection.id,
          metafields: {
            key: 'page_template',
            namespace: 'custom',
            value: pageId,
          },
        },
      },
    });
  }

  //get collection templates

  return {
    collection,
    page,
  };
}

export default function Collection() {
  const {collection, page} = useLoaderData<typeof loader>();
  const data = useLoaderData<typeof loader>();

  const {setEditorContent, editorContent}: any = useOutletContext();
  const root: any = useRouteLoaderData<RootLoader>('root');
  const catalogMenu = root?.header?.catalog?.items;

  useEffect(() => {
    //setEditorContent(template.fields?.content);
  }, []);

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
