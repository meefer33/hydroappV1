import {LoaderFunctionArgs} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import {GetPage} from '~/graphql/GetPage';
import {Container} from '@mantine/core';
import PageContent from '~/components/admin/dnd/PageContent';
import { loadPageContent } from '~/lib/metaLoaderUtils';

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

  const loadPage = await loadPageContent({admin,type:"page",typeId:storePage?.id,slug:slug,name:name,metafieldValue:storePage.page_content?.value})

  return {storePage, loadPage};
};

export default function EditPages() {
  //check if template and content, if not select and load
  const {storePage, loadPage}: any = useLoaderData<typeof loader>();

  return (
    <>
      <PageContent type="page" loadPage={loadPage}>
        <Container size={'lg'}>
          <main dangerouslySetInnerHTML={{__html: storePage.body}} />
        </Container>
      </PageContent>
    </>
  );
}

export const handle: any = {
  breadcrumb: () => <span>Layouts</span>,
};
