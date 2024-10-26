import {LoaderFunctionArgs} from '@remix-run/node';
import {useLoaderData, useOutletContext} from '@remix-run/react';
import {parser} from '~/lib/parseContent';
import EditorLayout from '~/components/admin/dnd/EditorLayout';
import {GetMetaobjectTypeHandle} from '~/graphql/GetMetaobjectTypeHandle';
import {useEffect} from 'react';
import {GetPage} from '~/graphql/GetPage';
import {GetMetaobjectById} from '~/graphql/admin/GetMetaobjectById';
import DndContent from '~/components/admin/dnd/DndContent';

export const loader = async ({context, params}: LoaderFunctionArgs) => {
  const {admin} = context;
  let breadcrumb = params['*'];
  //let handle = params['*']?.split('/').pop();
  let handle = params.handle;

  //get content page
  const getPage = await context.storefront.query(GetPage, {
    variables: {handle: handle},
  });
  const page = getPage?.page?.metafield?.value;

  //get content page
  const getContent = await context.storefront.query(GetMetaobjectById, {
    variables: {id: page},
    cache: context.storefront.CacheNone(),
  });
  const content = parser(getContent?.metaobject);

  return {content, breadcrumb, getContent};
};

export default function EditContent() {
  const {content, breadcrumb, getContent}: any = useLoaderData<typeof loader>();
  const {setEditorContent,editorContent}: any = useOutletContext();
//console.log('page',page)
  useEffect(() => {
    setEditorContent(content);
  }, [content]);

  return (
    <EditorLayout>
      <DndContent
        content={editorContent?.fields?.content}
        id={editorContent?.id}
        updateKey="content"
      />
    </EditorLayout>
  );
}

export const handle: any = {
  breadcrumb: () => <span>Layouts</span>,
};
