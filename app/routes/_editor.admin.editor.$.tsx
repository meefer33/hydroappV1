import {LoaderFunctionArgs} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import {parser} from '~/lib/parseContent';
import {GetMetaobjectByHandle} from '~/graphql/admin/GetMetaobjectByHandle';

import {EditorProvider} from '~/components/admin/dnd/EditorContext';
import EditorLayout from '~/components/admin/dnd/EditorLayout';

export const loader = async ({context, params}: LoaderFunctionArgs) => {
  const {admin} = context;
  let breadcrumb = params['*'];
  let handle = params['*']?.split('/').pop();

  //get content page
  const getContent = await admin.request(GetMetaobjectByHandle, {
    variables: {
      handle: {type: 'pages', handle: handle},
    },
  });
  const content = parser(getContent?.data?.metaobjectByHandle);
  //if no content yet create the

  return {content, breadcrumb, handle};
};

export default function EditContent() {
  const {content, breadcrumb, handle}: any = useLoaderData<typeof loader>();
  return (
    <EditorProvider>
      <EditorLayout content={content?.fields?.page} handle={handle} />
    </EditorProvider>
  );
}

export const handle = {
  breadcrumb: () => <span>Layouts</span>,
};
