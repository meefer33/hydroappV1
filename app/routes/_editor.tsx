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
import { buildTheme } from '~/components/admin/dnd/theme/lib/theme';
import {GetMetaobject} from '~/graphql/admin/GetMetaobject';
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

  //get all themes
  const getThemes = await admin.request(GetMetaobject, {
    variables: {
      type: 'themes',
    },
  });
  let themes = parser(getThemes?.data?.metaobjects);
  //if no themes than create default
  if (!themes[0]) {
    return redirect('/create-defaults');
  }

  //get all layouts
  const getLayouts = await admin.request(GetMetaobject, {
    variables: {
      type: 'layouts',
    },
  });
  const layouts = parser(getLayouts?.data?.metaobjects);
  if (!layouts[0]) {
    return redirect('/create-defaults');
  }

  //get all collections
  const getCollections = await storefront.query(GetCollections);
  const collections = parser(getCollections?.collections);

  return {themes, layouts, collections};
};

export default function Layout() {
  const {themes, layouts, collections}: any = useLoaderData<typeof loader>();
  const [theme, setTheme] = useState(buildTheme(themes[0]?.fields?.theme));
  const [item, setItem]: any = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [editorContent, setEditorContent]: any = useState();
  const [opened, {open, close}] = useDisclosure(false);
  const [metaData, setMetaData]: any = useState();
  const [viewport, setViewport] = useState('100%');
  const actionUpdateSettings = useFetcher();
  const saveTheme = (handle: any, theme: any) => {
    actionUpdateSettings.submit(
      {
        handle: {
          type: 'themes',
          handle: handle,
        },
        metaobject: {
          fields: [
            {
              key: 'name',
              value: handle,
            },
            {
              key: 'theme',
              value: JSON.stringify(theme),
            },
          ],
        },
      },
      {
        method: 'PUT',
        action: '/api/upsertMetaobject',
        encType: 'application/json',
      },
    );
  };

  const saveLayout = (handle: any, Layout: any) => {
    actionUpdateSettings.submit(
      {
        handle: {
          type: 'layouts',
          handle: handle,
        },
        metaobject: {
          fields: [
            {
              key: 'name',
              value: handle,
            },
            {
              key: 'layout',
              value: JSON.stringify(Layout),
            },
            {
              key: 'theme',
              value: themes[0].id,
            },
          ],
        },
      },
      {
        method: 'PUT',
        action: '/api/upsertMetaobject',
        encType: 'application/json',
      },
    );
  };

  return (
    <Outlet
      context={{
        themes,
        layouts,
        theme,
        setTheme,
        item,
        setItem,
        selectedItem, 
        setSelectedItem,
        saveTheme,
        saveLayout,
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
      }}
    />
  );
}
