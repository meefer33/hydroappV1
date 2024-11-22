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

export const loader = async ({context}: LoaderFunctionArgs) => {
  const {admin, storefront} = context;

  //get all templates
  const getTemplates = await storefront.query(GetMetaobjectsByType, {
    variables: {
      type: 'templates',
    },
  });
 
  if (!getTemplates?.metaobjects?.nodes[0]) {
    return redirect('/create-defaults');
  }
  let templates = parser(getTemplates?.metaobjects);

  return {templates};
};

export default function Layout() {
  const {templates}: any = useLoaderData<typeof loader>();
  const [theme, setTheme] = useState(null);
  const [layout, setLayout] = useState();
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
        viewport,
        setViewport,
        updateMetaVersionId,
        setUpdateMetaVersionId,
      }}
    />
  );
}
