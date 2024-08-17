import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import { Box, MantineProvider } from '@mantine/core';
import { updateSettings } from '~/lib/utils';
import Header from './Header';
import { Aside } from './Aside';
import Footer from './Footer';

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

export function ShopLayout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  publicStoreDomain,
  theme,
  layout,
}: ShopLayoutProps) {
  const themeSettings = updateSettings(theme)
  console.log('header',header)
  return (
    <MantineProvider theme={themeSettings} forceColorScheme={themeSettings.other.colorScheme} >

    <Aside.Provider>
      <Aside cart={cart}  header={header} publicStoreDomain={publicStoreDomain} />
      {header && (
        <Header
          header={header}
          cart={cart}
          isLoggedIn={isLoggedIn}
          publicStoreDomain={publicStoreDomain}
          layout={layout}
        />
      )}
      <Box mt={"130"} h="900">{children}</Box>
      <Footer
        footer={footer}
        header={header}
        publicStoreDomain={publicStoreDomain}
      />
    </Aside.Provider>
    </MantineProvider>
  );
}
