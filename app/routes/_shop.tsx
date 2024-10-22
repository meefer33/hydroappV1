import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import {Box, CSSVariablesResolver, MantineProvider} from '@mantine/core';
import {Aside} from '~/components/layout/Aside';
import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';
import {Outlet, useRouteLoaderData} from '@remix-run/react';
import {RootLoader} from '~/root';
import useThemeUtils from '~/components/admin/dnd/useEditorUtils';
import { buildTheme, getCssResolve } from '~/components/admin/dnd/theme/lib/theme';

interface ShopLayoutProps {
  cart: Promise<CartApiQueryFragment | null>;
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  children?: React.ReactNode;
  theme: any;
  layout: any;
}

export default function Layout({children}: any) {
  const root: any = useRouteLoaderData<RootLoader>('root');
 
  const bdTheme = buildTheme(root.theme);
  const cssResolver: CSSVariablesResolver = (theme) => getCssResolve(bdTheme);

  return (
    <>
      {root ? (
        <MantineProvider
          theme={bdTheme}
          forceColorScheme={root?.theme?.other?.colorScheme}
          cssVariablesResolver={cssResolver}
        >
          <Aside.Provider>
            <Aside
              cart={root?.cart}
              header={root?.header}
              publicStoreDomain={root?.publicStoreDomain}
            />

            <Header />

            <Box mih={900}>
              <Outlet />
            </Box>
            <Footer
              footer={root?.footer}
              header={root?.header}
              publicStoreDomain={root?.publicStoreDomain}
            />
          </Aside.Provider>
        </MantineProvider>
      ) : (
        children
      )}
    </>
  );
}
