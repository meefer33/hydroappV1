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
  const {storefront} = context;
  let handle = params['*']?.split('/').pop();

  const getTemplate = await storefront.query(GetMetaobjectTypeHandle, {
    variables: {handle: handle, type: 'templates'},
    cache: storefront.CacheCustom({
      mode: 'must-revalidate, no-store',
      maxAge: 1,
    })
  });
  if (!getTemplate?.metaobject) {
    if(handle === 'default-template'){
      return redirect('/setup');
    }
    return redirect('/templates');
  }

  const template = parser(getTemplate?.metaobject);
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
    setTheme(buildTheme(template?.fields?.theme?.fields?.theme));
    setEditorContent(template);
    setUpdateMetaVersionId(template.id);
  }, []);

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
