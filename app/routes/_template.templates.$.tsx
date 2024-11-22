import {LoaderFunctionArgs, MetaDescriptor, MetaFunction} from '@remix-run/node';
import {redirect, useLoaderData, useOutletContext} from '@remix-run/react';
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
import {GetMetaobjectTypeHandle} from '~/graphql/GetMetaobjectTypeHandle';
import {Box} from '@mantine/core';
import TemplateLayout from '~/components/admin/dnd/TemplateLayout';
import {buildTheme} from '~/components/admin/dnd/theme/lib/theme';


export const meta: MetaFunction<typeof loader> = ({data}:any) => {
  const loadFonts = [];
  console.log('data',data)
  const ff = data?.template?.fields?.theme?.fields?.theme?.fonts?.bodyUrl;
  const ffh = data?.template?.fields?.theme?.fields?.theme?.fonts?.headingsUrl;
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
  const {admin, storefront} = context;
  //let breadcrumb = params['*'];
  //let handle = params['*']?.split('/').pop();
  let handle = params['*']?.split('/').pop();
  let name = `templates/${params['*']}`;
  let slug = `templates-${params['*'].replaceAll('/', '-')}`;

  const getTemplate = await storefront.query(GetMetaobjectTypeHandle, {
    variables: {handle: handle, type: 'templates'},
  });

  let template;
  if (getTemplate?.metaobject) {
    template = parser(getTemplate?.metaobject);
  } else {
    return redirect('/templates');
  }

  return {template};
};

export default function EditContent() {
  const {template}: any = useLoaderData<typeof loader>();
  console.log('template', template?.fields?.theme?.fields?.theme);

  const {
    templates,
    setEditorContent,
    setUpdateMetaVersionId,
    setTheme,
    theme,
    editorContent,
    viewport,
    setViewport,
  }: any = useOutletContext();

  useEffect(() => {
    setTheme(buildTheme(template?.fields?.theme?.fields?.theme));
    setEditorContent(template);
    setUpdateMetaVersionId(template.id);
    console.log('theme',theme)
  }, []);

  return (
    <>
    {theme && 
    <TemplateLayout template={template}>
      <DndContent
        content={editorContent?.fields?.top?.fields?.content}
        id={editorContent?.fields?.top?.id}
        updateKey="content"
      />
      <ButtonAddSection data={editorContent?.fields?.top} />
    </TemplateLayout>
    }
    </>
  );
}

export const handle: any = {
  breadcrumb: () => <span>Layouts</span>,
};
