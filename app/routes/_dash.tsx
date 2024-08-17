import {MantineProvider} from '@mantine/core';
import {Outlet, useLoaderData} from '@remix-run/react';
import {LoaderFunctionArgs, redirect} from '@remix-run/server-runtime';
import {DashboardLayout} from '~/components/admin/DashboardLayout';
import {mainTheme} from '~/components/admin/mainTheme';
import {GetMetaobjectDefinitionByType} from '~/graphql/admin/GetMetaobjectDefinitionByType';
import  '@mantine/core/styles.css';

export const loader = async ({request, context}: LoaderFunctionArgs) => {
  const {admin} = context;

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
    <MantineProvider theme={mainTheme} defaultColorScheme="dark">
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </MantineProvider>
  );
}
