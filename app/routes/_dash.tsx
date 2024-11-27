import {MantineProvider,DEFAULT_THEME} from '@mantine/core';
import {Outlet, useLoaderData} from '@remix-run/react';
import {LoaderFunctionArgs, redirect} from '@remix-run/server-runtime';
import {DashboardLayout} from '~/components/admin/DashboardLayout';
import {GetMetaobjectDefinitionByType} from '~/graphql/admin/GetMetaobjectDefinitionByType';
import  '@mantine/core/styles.css';
import { GetMenus } from '~/graphql/admin/GetMenus';

export const loader = async ({request, context}: LoaderFunctionArgs) => {
  const {admin} = context;

  const menus = await admin.request(GetMenus)
console.log(JSON.stringify(menus))
  const {data: mo} = await admin.request(GetMetaobjectDefinitionByType, {
    variables: {
      type: 'ha_theme_settings',
    },
  });

  //if(!mo.metaobjectDefinitionByType){return redirect("/setup");}

  return mo;
};

export default function Dash({children}: {children?: React.ReactNode}) {
  const data: any = useLoaderData<typeof loader>();
  console.log(data)

  return (
    <MantineProvider theme={DEFAULT_THEME} defaultColorScheme="dark">
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </MantineProvider>
  );
}
