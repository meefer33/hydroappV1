import {MantineProvider} from '@mantine/core';
import {Config, Render} from '@measured/puck';
import {
  MetaDescriptor,
  MetaFunction,
  Outlet,
  useLoaderData,
  useMatch,
  useMatches,
  useRouteLoaderData,
} from '@remix-run/react';
import {LoaderFunctionArgs} from '@remix-run/server-runtime';
import {Analytics} from '@shopify/hydrogen';
import {contentLayout} from '~/components/admin/puck/sections/contentLayout';
import {header} from '~/components/admin/puck/sections/header';
import {theme} from '~/components/admin/puck/sections/theme';
import ThemeHeader from '~/components/admin/puck/theme/ThemeHeader';
import {Aside} from '~/components/layout/Aside';

import {ShopLayout} from '~/components/layout/ShopLayout';
import {GetLayoutTheme} from '~/graphql/GetLayoutTheme';
import {parseContent} from '~/lib/parseContent';
import {cssResolver, loadFonts, updateSettings} from '~/lib/utils';
import {RootLoader} from '~/root';

export const loader = async ({context}: LoaderFunctionArgs) => {
  const {storefront} = context;
  const handle = 'main';

  const layout = await storefront.query(GetLayoutTheme, {
    variables: {
      handle: handle,
    },
  });
  const parseLayout = JSON.parse(layout.metaobject.layout.value);
  const theme = JSON.parse(
    layout?.metaobject?.theme?.reference?.settings?.value,
  );

  return {parseLayout, theme};
};

export default function Layout({children}: any) {
  const data: any = useLoaderData<typeof loader>();

  const settings = updateSettings(data.theme);
  const ld: any = data?.parseLayout?.data?.zones['root:header'][0].props;
  const config: Config | any = {
    root: contentLayout(data?.parseLayout),
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
            <Render config={config} data={{}} />
            <Outlet context={settings}/>

          </Aside.Provider>
        </MantineProvider>
      ) : (
        children
      )}
    </>
  );
}
