import {LoaderFunctionArgs} from '@remix-run/node';
import {useLoaderData, useOutletContext} from '@remix-run/react';
import {parser} from '~/lib/parseContent';
import EditorLayout from '~/components/admin/dnd/EditorLayout';
import {useEffect} from 'react';
import {GetPage} from '~/graphql/GetPage';
import {GetMetaobjectById} from '~/graphql/GetMetaobjectById';
import DndContent from '~/components/admin/dnd/DndContent';
import {GetMetaobjectByIdPages} from '~/graphql/GetMetaobjectByIdPages';
import {UpsertMetaobject} from '~/graphql/admin/UpsertMetaobject';
import {PageUpdate} from '~/graphql/admin/PageUpdate';
import {CreateMetaobject} from '~/graphql/admin/CreateMetaobject';
import {UpdateMetaobject} from '~/graphql/admin/UpdateMetaobject';
import ButtonAddSection from '~/components/admin/dnd/ButtonAddSection';
import SectionBlocks from '~/components/admin/dnd/theme/sections/SectionBlocks';

export const loader = async ({context, params}: LoaderFunctionArgs) => {
  const {admin} = context;
  //let breadcrumb = params['*'];
  //let handle = params['*']?.split('/').pop();
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
    page: any = {};
  if (storePage.page_content?.value) {
    getPage = await admin.request(GetMetaobjectByIdPages, {
      variables: {id: storePage.page_content?.value},
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
    console.log('debug', JSON.stringify(upsertPage));
    console.log('debug', upsertPage?.data?.metaobjectUpsert?.metaobject?.id);
    const pageId = upsertPage?.data?.metaobjectUpsert?.metaobject?.id;
    //page = parser(upsertPage?.data?.metaobjectUpsert?.metaobject);
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
    console.log('debug', JSON.stringify(addMetafield));

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
    getPage = await admin.request(GetMetaobjectByIdPages, {
      variables: {id: pageId},
    });
    //console.log('debug',JSON.stringify(getPage))
    page = parser(getPage?.data?.metaobject);
  }

  return {storePage, page};
};

export default function EditContent() {
  const {storePage, page}: any = useLoaderData<typeof loader>();
  const {setEditorContent, editorContent, setUpdateMetaVersionId}: any =
    useOutletContext();
  console.log('page', page);
  useEffect(() => {
    setEditorContent(page);
    setUpdateMetaVersionId(page.id);
  }, [page]);

  return (
    <EditorLayout type="page">
      <DndContent
        content={editorContent?.fields?.top_content?.fields?.content}
        id={editorContent?.fields?.top_content?.id}
        updateKey="content"
      />
      <ButtonAddSection data={editorContent?.fields?.top_content} />
      <SectionBlocks content={editorContent}>
        <main dangerouslySetInnerHTML={{__html: storePage.body}} />
      </SectionBlocks>
      <DndContent
        content={editorContent?.fields?.bottom_content?.fields?.content}
        id={editorContent?.fields?.bottom_content?.id}
        updateKey="content"
      />
      <ButtonAddSection data={editorContent?.fields?.bottom_content} />
    </EditorLayout>
  );
}

export const handle: any = {
  breadcrumb: () => <span>Layouts</span>,
};
