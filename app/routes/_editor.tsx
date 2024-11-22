import {useDisclosure} from '@mantine/hooks';
import {
  MetaDescriptor,
  MetaFunction,
  Outlet,
  useFetcher,
  useLoaderData,
} from '@remix-run/react';
import {LoaderFunctionArgs, redirect} from '@remix-run/server-runtime';
import {useState} from 'react';
import {buildTheme} from '~/components/admin/dnd/theme/lib/theme';
import {GetMetaobjectsByType} from '~/graphql/GetMetaobjectsByType';
import {GetCollections} from '~/graphql/GetCollections';
import {parser} from '~/lib/parseContent';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const loadFonts = [];
  const ff = data?.themes[0]?.fields?.theme?.fonts?.bodyUrl;
  const ffh = data?.themes[0]?.fields?.theme?.fonts?.headingsUrl;
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

export const loader = async ({context}: LoaderFunctionArgs) => {
  const {admin, storefront} = context;

    //get all templates
    const getTemplates = await storefront.query(GetMetaobjectsByType, {
      variables: {
        type: 'templates',
      },
    });
    let templates = parser(getTemplates?.metaobjects);
    //if no themes than create default
    console.log('templates',JSON.stringify(getTemplates))
    if (!templates[0]) {
      return redirect('/create-defaults');
    }

  //get all themes
  const getThemes = await storefront.query(GetMetaobjectsByType, {
    variables: {
      type: 'themes',
    },
  });
  let themes = parser(getThemes?.metaobjects);
  //if no themes than create default
  console.log(JSON.stringify(getThemes))
  if (!themes[0]) {
    return redirect('/create-defaults');
  }

  //get all layouts
  const getLayouts = await storefront.query(GetMetaobjectsByType, {
    variables: {
      type: 'layouts',
    },
  });
  const layouts = parser(getLayouts?.metaobjects);
  if (!layouts[0]) {
    return redirect('/create-defaults');
  }

  //get all collections
  const getCollections = await storefront.query(GetCollections);
  const collections = parser(getCollections?.collections);

  return {templates, themes, layouts, collections};
};

export default function Layout() {
  const {templates, themes, layouts, collections}: any = useLoaderData<typeof loader>();
  const [theme, setTheme] = useState(buildTheme(themes[0]?.fields?.theme));
  const [layout, setLayout] = useState(layouts[0]?.fields?.layout);
  const [item, setItem]: any = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [editorContent, setEditorContent]: any = useState();
  const [opened, {open, close}] = useDisclosure(false);
  const [metaData, setMetaData]: any = useState();
  const [updateMetaVersionId, setUpdateMetaVersionId]: any = useState();
  const [viewport, setViewport] = useState('100%');

  return (
    <Outlet
      context={{
        templates,
        themeId: themes[0]?.id,
        layoutId: layouts[0]?.id,
        layout, 
        setLayout,
        theme,
        setTheme,
        item,
        setItem,
        selectedItem,
        setSelectedItem,
        editorContent,
        setEditorContent,
        modalIsOpen: opened,
        openModal: open,
        closeModal: close,
        metaData,
        setMetaData,
        collections,
        viewport,
        setViewport,
        updateMetaVersionId, 
        setUpdateMetaVersionId
      }}
    />
  );
}
