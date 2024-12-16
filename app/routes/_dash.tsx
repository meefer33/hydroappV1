import {MantineProvider, DEFAULT_THEME} from '@mantine/core';
import {Outlet, useLoaderData} from '@remix-run/react';
import {DashboardLayout} from '~/components/admin/DashboardLayout';
import '@mantine/core/styles.css';
import {GetMetaobjectsByType} from '~/graphql/GetMetaobjectsByType';
import {LoaderFunctionArgs} from '@remix-run/server-runtime';
import {parser} from '~/lib/parseContent';
import {getMetaobjectsByType} from '~/lib/metaLoaderUtils';
import {GetCollections} from '~/graphql/GetCollections';
import {useState} from 'react';
import {useDisclosure} from '@mantine/hooks';

export const loader = async ({context}: LoaderFunctionArgs) => {
  const {admin, storefront} = context;

  //get all templates
  const getTemplates = await getMetaobjectsByType({
    storefront,
    type: 'templates',
  });

  //get all themes
  const getThemes = await getMetaobjectsByType({storefront, type: 'themes'});

  //get all collections
  const getCollections = await storefront.query(GetCollections);
  const collections = parser(getCollections?.collections);

  return {getTemplates, getThemes, collections};
};

export default function Dash() {
  const {getTemplates, getThemes, collections}: any =
    useLoaderData<typeof loader>();
  const [templates, setTemplates] = useState(getTemplates);
  const [themes, setThemes] = useState(getThemes);
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
    <MantineProvider theme={DEFAULT_THEME} defaultColorScheme="dark">
      <DashboardLayout>
        <Outlet
          context={{
            templates,
            setTemplates,
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
      </DashboardLayout>
    </MantineProvider>
  );
}
