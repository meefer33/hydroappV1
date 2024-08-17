import { MantineProvider } from '@mantine/core';
import {Outlet, useRouteLoaderData} from '@remix-run/react';
import {Analytics} from '@shopify/hydrogen';
import { Aside } from '~/components/layout/Aside';

import { ShopLayout } from '~/components/layout/ShopLayout';
import { cssResolver, updateSettingsEditMode } from '~/lib/utils';
import {RootLoader} from '~/root';

export default function Layout({children}: any) {
  const data = useRouteLoaderData<RootLoader>('root');
  const settings = updateSettingsEditMode(data?.theme)

  return (
    <>
     
       <MantineProvider
       theme={settings}
       forceColorScheme={data.theme.other.colorScheme}
       cssVariablesResolver={cssResolver}
     >
       <Aside.Provider>
         <Aside
           cart={data.cart}
           header={data.header}
           publicStoreDomain={data.publicStoreDomain}
         />
         <Outlet />
       </Aside.Provider>
     </MantineProvider>
     
    </>
  );
}
