import {MetaDescriptor, MetaFunction, Outlet, useFetcher, useLoaderData} from '@remix-run/react';
import {LoaderFunctionArgs, redirect} from '@remix-run/server-runtime';
import {useEffect} from 'react';
import {
  defaultTheme,
  defaultLayout,
  loadFonts,
} from '~/components/admin/dnd/theme/themeUtils';
import {GetMetaobject} from '~/graphql/admin/GetMetaobject';
import { GetMetaobjectByHandle } from '~/graphql/admin/GetMetaobjectByHandle';
import {parser} from '~/lib/parseContent';


export const meta: MetaFunction<typeof loader> = ({data}) => {
  return loadFonts(
    data?.themes[0]?.fields?.theme?.fonts,
  ) satisfies MetaDescriptor[];
};

export const loader = async ({context,params}: LoaderFunctionArgs) => {
  const {admin} = context;
  let breadcrumb = params['*'];
  let handle = params['*']?.split('/').pop();

  //get all themes
  const getThemes = await admin.request(GetMetaobject, {
    variables: {
      type: 'themes',
    },
  });
  let themes = parser(getThemes?.data?.metaobjects);
  //if no themes than create default
  if(!themes[0]){
    return redirect('/create-defaults');
  }

  //get all layouts
  const getLayouts = await admin.request(GetMetaobject, {
    variables: {
      type: 'layouts',
    },
  });
  const layouts = parser(getLayouts?.data?.metaobjects);
  if(!layouts[0]){
    return redirect('/create-defaults');
  }

  return {themes, layouts};
};

export default function Layout({children}: any) {
  const {themes, layouts}: any = useLoaderData<typeof loader>();

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

  const savePage = (handle: any, page: any) => {
    actionUpdateSettings.submit(
      {
        handle: {
          type: 'pages',
          handle: handle,
        },
        metaobject: {
          fields: [
            {
              key: 'name',
              value: handle,
            },
            {
              key: 'page',
              value: JSON.stringify(page),
            },
            {
              key: 'layout',
              value: layouts[0].id,
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


  return <Outlet context={{themes, layouts, saveTheme, saveLayout, savePage}} />;
}
