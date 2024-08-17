import { HeaderQuery } from "storefrontapi.generated";
import HeaderMenu from "./HeaderMenu";

export default function MobileMenuDrawer({
    header,
    publicStoreDomain,
  }: {
    header: HeaderQuery;
    publicStoreDomain: string;
  }) {
    return (
      header.menu &&
      header.shop.primaryDomain?.url && (
          <HeaderMenu
            menu={header.menu}
            viewport="mobile"
            primaryDomainUrl={header.shop.primaryDomain.url}
            publicStoreDomain={publicStoreDomain}
          />
      )
    );
  }