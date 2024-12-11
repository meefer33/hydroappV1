import {
  LoaderFunctionArgs,
  MetaDescriptor,
  MetaFunction,
} from '@remix-run/node';
import {redirect, useLoaderData, useOutletContext} from '@remix-run/react';
import {parser} from '~/lib/parseContent';
import {useEffect} from 'react';
import DndContent from '~/components/admin/dnd/DndContent';
import ButtonAddSection from '~/components/admin/dnd/ButtonAddSection';
import {GetMetaobjectTypeHandle} from '~/graphql/GetMetaobjectTypeHandle';
import {buildTheme} from '~/components/admin/dnd/theme/lib/theme';
import EditorLayout from '~/components/admin/dnd/EditorLayout';
import {
  createTemplate,
  createTheme,
  getMetaobjectTypeHandle,
} from '~/lib/metaLoaderUtils';

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

  let template = await getMetaobjectTypeHandle({
    storefront,
    handle: handle,
    type: 'templates',
  });

  if (!template?.id) {
    if (handle === 'default-template') {
      template = await createTemplate({admin,name:handle,themeName:'default-theme'});
      return {template};
    }
    return redirect('/templates');
  }

  return {template};
};

export default function EditContent() {
  const {template}: any = useLoaderData<typeof loader>();
  
  const {
    setEditorContent,
    setUpdateMetaVersionId,
    setTheme,
    theme,
    editorContent,
  }: any = useOutletContext();

  useEffect(() => {
    setTheme(null)
    setTheme(buildTheme(template?.fields?.theme?.fields?.theme));
    setEditorContent(template);
    setUpdateMetaVersionId(template.id);
    console.log('template', template);
  }, [template]);

  return (
    <>
      {theme && (
        <EditorLayout template={template}>
          <DndContent
            content={editorContent?.fields?.top?.fields?.content}
            id={editorContent?.fields?.top?.id}
            updateKey="content"
          />
          <ButtonAddSection data={editorContent?.fields?.top} />
        </EditorLayout>
      )}
    </>
  );
}

export const handle: any = {
  breadcrumb: () => <span>Layouts</span>,
};
