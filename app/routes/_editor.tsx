import {useDisclosure} from '@mantine/hooks';
import {Outlet, useLoaderData} from '@remix-run/react';
import {LoaderFunctionArgs} from '@remix-run/server-runtime';
import {useState} from 'react';
import {GetMetaobjectsByType} from '~/graphql/GetMetaobjectsByType';
import {GetCollections} from '~/graphql/GetCollections';
import {parser} from '~/lib/parseContent';
import { getMetaobjectsByType } from '~/lib/metaLoaderUtils';

export const loader = async ({context}: LoaderFunctionArgs) => {
  const {admin, storefront} = context;

  //get all templates
  const getTemplates = await getMetaobjectsByType({storefront,type:'templates'});

  //get all themes
  const getThemes = await getMetaobjectsByType({storefront,type:'themes'});

  //get all collections
  const getCollections = await storefront.query(GetCollections);
  const collections = parser(getCollections?.collections);

  return {getTemplates, getThemes, collections};
};

export default function Layout() {
  const {getTemplates, getThemes, collections}: any = useLoaderData<typeof loader>();
  const [templates,setTemplates] = useState(getTemplates)
  const [template,setTemplate] = useState(null)
  const [themes,setThemes] = useState(getThemes)
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
        setTemplates,
        template,
        setTemplate,
        themes,
        setThemes,
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
