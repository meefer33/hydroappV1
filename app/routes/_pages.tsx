import {MantineProvider} from '@mantine/core';
import { Config, Render } from '@measured/puck';
import {Outlet, useRouteLoaderData} from '@remix-run/react';
import { contentLayout } from '~/components/admin/puck/sections/contentLayout';
import ThemeHeader from '~/components/admin/puck/theme/ThemeHeader';
import {Aside} from '~/components/layout/Aside';
import {cssResolver, updateSettings} from '~/lib/utils';
import {RootLoader} from '~/root';

export default function Layout({children}: any) {
  const data:any = useRouteLoaderData<RootLoader>('root');
  const settings = updateSettings(data?.theme);
  const ld:any = data?.layout?.data?.zones['root:header'][0].props;
  const config: Config | any = {
    root: contentLayout(data?.layout),
  };
console.log('hit layout')
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
