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
import ButtonAddSection from '~/components/admin/dnd/ButtonAddSection';
import {UpdateMetaobject} from '~/graphql/admin/UpdateMetaobject';
import SectionBlocks from '~/components/admin/dnd/theme/sections/SectionBlocks';
import { GetMetaobjectById } from '~/graphql/GetMetaobjectById';

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

  //get page in pages metaobject
  let getPage: any = {},
    page: any = {};
  if (collection?.page_content?.value) {
    getPage = await admin.request(GetMetaobjectById, {
      variables: {id: collection?.page_content?.value},
    });
    page = parser(getPage?.data?.metaobject);
  } else {
    //create page in pages metaobject
    const upsertPage = await admin.request(UpsertMetaobject, {
      variables: {
        handle: {
          type: 'pages',
          handle: slug,
        },
        metaobject: {
          fields: [{key: 'name', value: name}],
          capabilities: {publishable: {status: 'ACTIVE'}},
        },
      },
    });
    //console.log('debug',JSON.stringify(upsertPage))
    const pageId = upsertPage?.data?.metaobjectUpsert?.metaobject?.id;
    //page = parser(upsertPage?.data?.metaobjectUpsert?.metaobject);
    //add page_template metaobject to collection
    const addMetafield = await admin.request(CollectionUpdate, {
      variables: {
        input: {
          id: collection.id,
          metafields: {
            key: 'page_content',
            namespace: 'custom',
            value: pageId,
          },
        },
      },
    });

    //create content for top
    const createMetaobject1 = await admin.request(CreateMetaobject, {
      variables: {
        metaobject: {
          type: 'content',
          capabilities: {publishable: {status: 'ACTIVE'}},
        },
      },
    });
    const createMetaobject2 = await admin.request(CreateMetaobject, {
      variables: {
        metaobject: {
          type: 'content',
          capabilities: {publishable: {status: 'ACTIVE'}},
        },
      },
    });

    const response = await admin.request(UpdateMetaobject, {
      variables: {
        id: pageId,
        metaobject: {
          fields: [
            {
              key: 'top_content',
              value: createMetaobject1.data?.metaobjectCreate?.metaobject?.id,
            },
            {
              key: 'bottom_content',
              value: createMetaobject2.data?.metaobjectCreate?.metaobject?.id,
            },
          ],
        },
      },
    });
    getPage = await admin.request(GetMetaobjectById, {
      variables: {id: pageId},
    });
    //console.log('debug',JSON.stringify(getPage))
    page = parser(getPage?.data?.metaobject);
  }

  return {
    collection,
    page,
  };
}

export default function Collection() {
  const {collection, page} = useLoaderData<typeof loader>();
  const {setEditorContent, editorContent, setUpdateMetaVersionId}: any =
    useOutletContext();
  const root: any = useRouteLoaderData<RootLoader>('root');
  const catalogMenu = root?.header?.catalog?.items;

  useEffect(() => {
    setEditorContent(page);
    setUpdateMetaVersionId(page.id);
  }, [page]);

  return (
    <EditorLayout type="collection">
      <DndContent
        content={editorContent?.fields?.top_content?.fields?.content}
        id={editorContent?.fields?.top_content?.id}
        updateKey="content"
      />
      <ButtonAddSection data={editorContent?.fields?.top_content} />

      <SectionBlocks content={editorContent.fields?.settings}>
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
      </SectionBlocks>
      <DndContent
        content={editorContent?.fields?.bottom_content?.fields?.content}
        id={editorContent?.fields?.bottom_content?.id}
        updateKey="content"
      />
    </EditorLayout>
  );
}
