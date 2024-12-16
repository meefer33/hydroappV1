import {
  LoaderFunctionArgs,
  MetaDescriptor,
  MetaFunction,
} from '@remix-run/node';
import {redirect, useLoaderData, useOutletContext} from '@remix-run/react';
import {useEffect} from 'react';
import DndContent from '~/components/admin/dnd/DndContent';
import ButtonAddSection from '~/components/admin/dnd/ButtonAddSection';
import {buildTheme} from '~/components/admin/dnd/theme/lib/theme';
import EditorLayout from '~/components/admin/dnd/EditorLayout';
import {createTemplate, getMetaobjectTypeHandle} from '~/lib/metaLoaderUtils';

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

  let templateHandle = await getMetaobjectTypeHandle({
    storefront,
    handle: handle,
    type: 'templates',
  });

  if (!templateHandle?.id) {
    if (handle === 'default-template') {
      templateHandle = await createTemplate({
        admin,
        name: handle,
        themeName: 'default-theme',
      });
      return {templateHandle};
    }
    return redirect('/templates');
  }

  return {templateHandle};
};

export default function EditContent() {
  const {templateHandle}: any = useLoaderData<typeof loader>();

  const {
    setEditorContent,
    setUpdateMetaVersionId,
    setTheme,
    theme,
    editorContent,
    template,setTemplate,
  }: any = useOutletContext();

  useEffect(() => {
    //setTheme(null);
    setTheme(buildTheme(templateHandle?.fields?.theme?.fields?.theme));
    setEditorContent(templateHandle);
    setUpdateMetaVersionId(templateHandle.id);
    setTemplate(templateHandle)
    console.log('template', templateHandle);
  }, [templateHandle]);

  return (
    <>
      {template && (
        <EditorLayout type="template">
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
