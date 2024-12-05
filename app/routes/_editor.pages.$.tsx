import {LoaderFunctionArgs} from '@remix-run/node';
import {useLoaderData, useOutletContext} from '@remix-run/react';
import {parser} from '~/lib/parseContent';
import {useEffect} from 'react';
import {GetPage} from '~/graphql/GetPage';
import {GetMetaobjectById} from '~/graphql/GetMetaobjectById';
import {UpsertMetaobject} from '~/graphql/admin/UpsertMetaobject';
import {PageUpdate} from '~/graphql/admin/PageUpdate';
import EditorLayout from '~/components/admin/dnd/EditorLayout';
import DndContent from '~/components/admin/dnd/DndContent';
import ButtonAddSection from '~/components/admin/dnd/ButtonAddSection';
import {defaultTheme} from '~/components/admin/dnd/theme/lib/metaTypes';
import {buildTheme} from '~/components/admin/dnd/theme/lib/theme';
import MetaContent from '~/components/admin/dnd/theme/MetaContent';
import {Container} from '@mantine/core';

export const loader = async ({context, params}: LoaderFunctionArgs) => {
  const {admin, storefront} = context;
  let handle = params['*']?.split('/').pop();
  let name = `pages/${params['*']}`;
  let slug = `pages-${params['*'].replaceAll('/', '-')}`;

  //get content page
  const getStorePage = await context.storefront.query(GetPage, {
    variables: {handle: handle},
  });
  const storePage = getStorePage?.page;

  if (!storePage) {
    throw new Response(`Page ${handle} not found`, {
      status: 404,
    });
  }

  //get page in pages metaobject
  let getPage: any = {},
    loadPage: any = {};

  if (storePage.page_content?.value) {
    getPage = await admin.request(GetMetaobjectById, {
      variables: {id: storePage.page_content?.value},
    });
    loadPage = parser(getPage?.data?.metaobject);
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
    const pageId = upsertPage?.data?.metaobjectUpsert?.metaobject?.id;
    //add page_template metaobject to collection
    const addMetafield = await admin.request(PageUpdate, {
      variables: {
        id: storePage?.id,
        page: {
          metafields: {
            key: 'page_content',
            namespace: 'custom',
            value: pageId,
          },
        },
      },
    });
    loadPage = parser(upsertPage?.data?.metaobjectUpsert?.metaobject);
  }

  return {storePage, loadPage};
};

export default function EditPages() {
  //check if template and content, if not select and load
  const {storePage, loadPage}: any = useLoaderData<typeof loader>();
  const {
    templates,
    page,
    setPage,
    setTheme,
    theme,
    setEditorContent,
    editorContent,
    setUpdateMetaVersionId,
  }: any = useOutletContext();

  useEffect(() => {
    setPage(loadPage);
  }, []);

  useEffect(() => {
    //set and build the theme here with
    console.log('lt', page);
    !page?.fields?.template?.fields?.theme?.fields?.theme
      ? setTheme(buildTheme(defaultTheme))
      : setTheme(
          buildTheme(page?.fields?.template?.fields?.theme?.fields?.theme),
        );
    setEditorContent(page);
    setUpdateMetaVersionId(page?.id);
  }, [page]);

  return (
    <>
      {theme && (
        <EditorLayout type="page" pageId={page.id}>
          {page?.fields?.template?.fields?.top && (
            <>
              <MetaContent
                content={page?.fields?.template?.fields?.top?.fields?.content}
                theme={theme}
              />
            </>
          )}
          {page?.fields?.top_content && (
            <>
              <DndContent
                content={editorContent?.fields?.top_content?.fields?.content}
                id={editorContent?.fields?.top_content?.id}
                updateKey="content"
              />
              <ButtonAddSection data={editorContent?.fields?.top_content} />
            </>
          )}
          <Container size={'lg'}>
            <main dangerouslySetInnerHTML={{__html: storePage.body}} />
          </Container>
          {page?.fields?.bottom_content && (
            <>
              <DndContent
                content={editorContent?.fields?.bottom_content?.fields?.content}
                id={editorContent?.fields?.bottom_content?.id}
                updateKey="content"
              />
              <ButtonAddSection data={editorContent?.fields?.bottom_content} />
            </>
          )}
          {page?.fields?.template?.fields?.bottom && (
            <>
              <MetaContent
                content={
                  page?.fields?.template?.fields?.bottom?.fields?.content
                }
                theme={theme}
              />
            </>
          )}
        </EditorLayout>
      )}
    </>
  );
}

export const handle: any = {
  breadcrumb: () => <span>Layouts</span>,
};
