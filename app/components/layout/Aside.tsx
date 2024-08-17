import {Drawer} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {createContext, type ReactNode, useContext, useState} from 'react';
import {CartApiQueryFragment, HeaderQuery} from 'storefrontapi.generated';
import SearchDrawer from './SearchDrawer';
import CartDrawer from './CartDrawer';
import MobileMenuDrawer from './MobileMenuDrawer';


type AsideType = 'Search' | 'Cart' | 'Menu' | 'closed';
type AsideContextValue = {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
  opened: any;
  openDrawer: any;
};

/**
 * A side bar component with Overlay
 * @example
 * ```jsx
 * <Aside type="search" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 */
export function Aside({
  cart,
  header,
  publicStoreDomain,
}: {
  cart: Promise<CartApiQueryFragment | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}) {
  const {type, opened, close} = useAside();

  return (
    <Drawer opened={opened} onClose={close} title={type} position="right">
      {type === 'Search' ? <SearchDrawer/>:''}
      {type === 'Cart' ? <CartDrawer cart={cart}/>:''}
      {type === 'Menu' ? <MobileMenuDrawer header={header} publicStoreDomain={publicStoreDomain}/>:''}
    </Drawer>
  );
}

const AsideContext = createContext<AsideContextValue | null>(null);

Aside.Provider = function AsideProvider({children}: {children: ReactNode}) {
  const [type, setType] = useState<AsideType>('closed');
  const [opened, {open, close}] = useDisclosure(false);
  const openDrawer = (drawer:any) => {
    setType(drawer);
    open();
  }

  return (
    <AsideContext.Provider
      value={{
        openDrawer,
        opened,
        open,
        close,
        type
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}
