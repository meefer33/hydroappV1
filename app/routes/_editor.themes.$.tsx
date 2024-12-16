import {
  LoaderFunctionArgs,
  MetaDescriptor,
  MetaFunction,
} from '@remix-run/node';
import {redirect, useLoaderData, useOutletContext} from '@remix-run/react';
import {useEffect} from 'react';
import {buildTheme} from '~/components/admin/dnd/theme/lib/theme';
import EditorLayout from '~/components/admin/dnd/EditorLayout';
import {
  createTheme,
  getMetaobjectTypeHandle,
} from '~/lib/metaLoaderUtils';
import { Button } from '@mantine/core';

export const meta: MetaFunction<typeof loader> = ({data}: any) => {
  const loadFonts = [];
  const themeFonts = data?.template?.fields?.theme?.fields?.theme?.fonts;
  const ff = themeFonts?.bodyUrl;
  const ffh = themeFonts?.headingsUrl;
  ff &&
    loadFonts.push({
      tagName: 'link',
      rel: 'stylesheet',
      href: ff,
    });
  ffh &&
    loadFonts.push({
      tagName: 'link',
      rel: 'stylesheet',
      href: ffh,
    });
  return loadFonts satisfies MetaDescriptor[];
};

export const loader = async ({context, params}: LoaderFunctionArgs) => {
  const {storefront, admin} = context;
  let handle = params['*']?.split('/').pop();

  let editTheme = await getMetaobjectTypeHandle({
    storefront,
    handle: handle,
    type: 'themes',
  });

  if (!editTheme?.id) {
    if (handle === 'default-theme') {
      editTheme = await createTheme({admin,name:'default-theme'});
      return {editTheme};
    }
    return redirect('/themes');
  }

  return {editTheme};
};

export default function EditorTheme() {
  const {editTheme}: any = useLoaderData<typeof loader>();
  
  const {
    setTheme,
  }: any = useOutletContext();

  useEffect(() => {
    setTheme(null)
    setTheme(buildTheme(editTheme?.fields?.theme));
    console.log('editTheme', editTheme);
  }, [editTheme]);

  return (
    <>
      {editTheme && (
        <EditorLayout type="theme" editTheme={editTheme}>
          <Button color="primary" >Primary</Button>
        </EditorLayout>
      )}
    </>
  );
}

export const handle: any = {
  breadcrumb: () => <span>Layouts</span>,
};
