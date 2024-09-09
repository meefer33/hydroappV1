import {MantineProvider} from '@mantine/core';
import { Config, Render } from '@measured/puck';
import {MetaDescriptor, MetaFunction, Outlet, useRouteLoaderData} from '@remix-run/react';
import {Analytics} from '@shopify/hydrogen';
import { contentLayout } from '~/components/admin/puck/sections/contentLayout';
import { header } from '~/components/admin/puck/sections/header';
import { theme } from '~/components/admin/puck/sections/theme';
import ThemeHeader from '~/components/admin/puck/theme/ThemeHeader';
import {Aside} from '~/components/layout/Aside';

import {ShopLayout} from '~/components/layout/ShopLayout';
import {cssResolver, loadFonts, updateSettings} from '~/lib/utils';
import {loader, RootLoader} from '~/root';

export default function Layout({children}: any) {
  const data:any = useRouteLoaderData<RootLoader>('root');
  const settings = updateSettings(data?.theme);
  const ld:any = data?.layout?.data?.zones['root:header'][0].props;
  const config: Config | any = {
    root: contentLayout(data?.layout),
  };

  return (
    <>
      {data ? (
        <MantineProvider
          theme={settings}
          forceColorScheme={data?.theme?.other?.colorScheme}
          cssVariablesResolver={cssResolver}
        >
          <Aside.Provider>
            <Aside
              cart={data.cart}
              header={data.header}
              publicStoreDomain={data.publicStoreDomain}
            />
            <ThemeHeader {...ld} />          
            <Outlet />
          </Aside.Provider>
        </MantineProvider>
      ) : (
        children
      )}
    </>
  );
}
