import {useDisclosure} from '@mantine/hooks';
import {Outlet, useLoaderData} from '@remix-run/react';
import {LoaderFunctionArgs} from '@remix-run/server-runtime';
import {useState} from 'react';
import {GetMetaobjectsByType} from '~/graphql/GetMetaobjectsByType';
import {GetCollections} from '~/graphql/GetCollections';
import {parser} from '~/lib/parseContent';

export const loader = async ({context}: LoaderFunctionArgs) => {
  const {admin, storefront} = context;

  //get all templates
  const getTemplates = await storefront.query(GetMetaobjectsByType, {
    variables: {
      type: 'templates',
    },
    cache: storefront.CacheCustom({
      mode: 'must-revalidate, no-store',
      maxAge: 1,
    })
  });
  let templates = parser(getTemplates?.metaobjects);

  //get all themes
  const getThemes = await storefront.query(GetMetaobjectsByType, {
    variables: {
      type: 'themes',
    },
    cache: storefront.CacheCustom({
      mode: 'must-revalidate, no-store',
      maxAge: 1,
    })
  });
  let themes = parser(getThemes?.metaobjects);

  //get all collections
  const getCollections = await storefront.query(GetCollections);
  const collections = parser(getCollections?.collections);

  return {templates, themes, collections};
};

export default function Layout() {
  const {templates, themes, collections}: any = useLoaderData<typeof loader>();
  const [theme, setTheme] = useState(null);
  const [page, setPage] = useState(null);
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
        themes,
        collections,
        theme,
        setTheme,
        page, 
        setPage,
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
        viewport,
        setViewport,
        updateMetaVersionId,
        setUpdateMetaVersionId,
      }}
    />
  );
}
