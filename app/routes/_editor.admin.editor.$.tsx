import {LoaderFunctionArgs} from '@remix-run/node';
import {useLoaderData, useOutletContext} from '@remix-run/react';
import {parser} from '~/lib/parseContent';
import EditorLayout from '~/components/admin/dnd/EditorLayout';
import {GetMetaobjectTypeHandle} from '~/graphql/GetMetaobjectTypeHandle';
import {useEffect} from 'react';

export const loader = async ({context, params}: LoaderFunctionArgs) => {
  const {admin} = context;
  let breadcrumb = params['*'];
  let handle = params['*']?.split('/').pop();

  //get content page
  const getContent = await context.storefront.query(GetMetaobjectTypeHandle, {
    variables: {type: 'content', handle: handle},
    cache: context.storefront.CacheNone(),
  });
  const content = parser(getContent?.metaobject);

  return {content, breadcrumb, getContent};
};

export default function EditContent() {
  const {content, breadcrumb,getContent}: any = useLoaderData<typeof loader>();
  const {setEditorContent}: any = useOutletContext();
console.log('getContent',getContent)
  useEffect(() => {
    setEditorContent(content);
  }, [content]);

  return <EditorLayout />;
}

export const handle = {
  breadcrumb: () => <span>Layouts</span>,
};
