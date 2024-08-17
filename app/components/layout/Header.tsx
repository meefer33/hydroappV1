import {
  Anchor,
  Avatar,
  Badge,
  Box,
  Burger,
  Button,
  Container,
  Grid,
  Group,
  Menu,
  rem,
} from '@mantine/core';
import {Await, NavLink} from '@remix-run/react';
import {
  RiArrowDownSLine,
  RiSearchLine,
  RiShoppingCartLine,
  RiUserFill,
  RiUserLine,
} from '@remixicon/react';
import {CartViewPayload, Image, useAnalytics} from '@shopify/hydrogen';
import {Suspense} from 'react';
import {CartApiQueryFragment, HeaderQuery} from 'storefrontapi.generated';
import {useAside} from './Aside';
import {useHeadroom, useViewportSize} from '@mantine/hooks';
import {Carousel} from '@mantine/carousel';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  layout: any;
}

export default function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
  layout,
}: HeaderProps) {
  const pinned = useHeadroom({fixedAt: 100});
  const { height, width } = useViewportSize();
  const pinHeight = width < 600 ? -40 : -40
  const layoutProps = layout.data.zones['root:header'][0].props;
  const primaryDomainUrl = header.shop.primaryDomain.url;
  const {openDrawer} = useAside();
  console.log(width);
  return (
    <>
      <Container
        fluid
        px="0"
        styles={{
          root: {
            //boxShadow: '0 1px 3px -1px rgba(0, 0, 0, 0.1)',
            //height: rem(40),
            zIndex: 1,
            transform: `translate3d(0, ${pinned ? 0 : rem(pinHeight)}, 0)`,
            transition: 'transform 400ms ease',
            backgroundColor: 'var(--mantine-color-body)',
            //borderBottom: '1px solid var(--mantine-color-gray-3)',
          },
        }}
        pos="fixed"
        top="0"
        left="0"
        right="0"
      >
        <Container
          fluid
          py="4"
          style={{
            borderBottom: '1px solid var(--mantine-color-gray-3)',
           //borderTop: '1px solid var(--mantine-color-gray-3)',
          }}
        >
          <Group justify={`${width < 600 ? "center" : "space-between"}`} align="center">
            <Group align="center">
              <svg
                width="120"
                viewBox="0 0 195 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>ButcherBox Logo</title>
                <g fill="#262421">
                  <path d="M7.478 15.357H.324V.555h6.982c3.073 0 4.964 1.502 4.964 3.828v.041c0 1.671-.904 2.603-1.978 3.194 1.74.655 2.815 1.648 2.815 3.637v.042c0 2.708-2.235 4.06-5.63 4.06zM8.982 4.933c0-.974-.774-1.524-2.17-1.524H3.546v3.13h3.05c1.461 0 2.385-.466 2.385-1.566v-.04zm.838 5.92c0-.994-.752-1.607-2.45-1.607H3.546v3.256h3.932c1.461 0 2.342-.506 2.342-1.607v-.042zM145.655 15.26h-7.153V.459h6.982c3.072 0 4.963 1.502 4.963 3.828v.043c0 1.67-.903 2.6-1.977 3.192 1.74.656 2.815 1.65 2.815 3.638v.042c0 2.706-2.235 4.06-5.63 4.06zm1.505-10.424c0-.974-.774-1.523-2.171-1.523h-3.265V6.44h3.049c1.463 0 2.386-.463 2.386-1.564v-.041h.001zm.838 5.92c0-.994-.752-1.606-2.45-1.606h-3.823v3.256h3.931c1.462 0 2.343-.507 2.343-1.607v-.041l-.001-.001zM26.412 15.493c-4.039 0-6.51-2.22-6.51-6.577V.458h3.31v8.375c0 2.41 1.224 3.658 3.243 3.658s3.244-1.206 3.244-3.553V.457h3.308V8.81c0 4.484-2.557 6.683-6.596 6.683M47.85 3.54v11.798h-3.308V3.539h-4.577V.536h12.461v3.003H47.85zM66.707 15.514c-4.426 0-7.713-3.363-7.713-7.613v-.042c0-4.208 3.222-7.654 7.842-7.654 2.835 0 4.532.93 5.929 2.284L70.66 4.877c-1.16-1.036-2.342-1.67-3.847-1.67-2.534 0-4.36 2.072-4.36 4.61v.041c0 2.538 1.783 4.651 4.36 4.651 1.72 0 2.772-.676 3.955-1.733l2.104 2.094c-1.547 1.628-3.266 2.643-6.165 2.643M88.727 15.318V9.377h-6.102v5.941h-3.309V.516h3.309v5.86h6.102V.515h3.308v14.802h-3.308zM99.688 15.3V.497h11.342v2.897h-8.057v3.003h7.092v2.897h-7.092v3.109h8.165V15.3h-11.45zM127.785 15.28l-3.223-4.735h-2.6v4.735h-3.308V.478h6.875c3.545 0 5.672 1.84 5.672 4.886v.041c0 2.39-1.311 3.891-3.223 4.588l3.674 5.287h-3.867zm.064-9.748c0-1.395-.988-2.114-2.6-2.114h-3.287v4.25h3.352c1.61 0 2.535-.846 2.535-2.092v-.043zM164.611 15.514c-4.64 0-7.97-3.402-7.97-7.612V7.86c0-4.208 3.372-7.655 8.013-7.655s7.971 3.404 7.971 7.612v.042c0 4.209-3.373 7.654-8.013 7.654l-.001.001zm4.556-7.655c0-2.537-1.891-4.652-4.555-4.652-2.663 0-4.512 2.073-4.512 4.61v.042c0 2.538 1.89 4.652 4.554 4.652 2.663 0 4.513-2.072 4.513-4.61v-.042zM187.701 15.26l-3.373-5.075-3.393 5.075h-3.761l5.242-7.528-5.028-7.274h3.867l3.159 4.8 3.18-4.8h3.759l-5.026 7.233 5.241 7.57h-3.867zM194.323 1.506a1.01 1.01 0 01-1.03 1.017 1.015 1.015 0 01-1.035-1.017c0-.57.46-1.005 1.035-1.005.576 0 1.03.448 1.03 1.005zm-1.807 0c0 .448.331.803.783.803.453 0 .766-.355.766-.797 0-.442-.325-.809-.772-.809-.446 0-.777.361-.777.803zm.619.527h-.233V1.028c.093-.018.221-.03.386-.03.19 0 .275.03.349.072a.28.28 0 01.099.22c0 .111-.085.197-.208.233v.012c.097.037.153.111.183.245.031.153.049.214.074.25h-.251c-.031-.036-.049-.128-.079-.244-.019-.11-.08-.16-.208-.16h-.111v.405l-.001.002zm.006-.57h.111c.129 0 .232-.042.232-.147 0-.092-.067-.153-.214-.153a.563.563 0 00-.129.012v.288z"></path>
                </g>
              </svg>
              <Box>|</Box>
              <svg
                width="190"
                viewBox="0 1 181 10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>ButcherBox For Pets Logo</title>
                <g fill="#262421">
                  <path d="M4.531 10.598H0V1.222h4.423c1.946 0 3.144.951 3.144 2.425v.026c0 1.058-.572 1.649-1.252 2.023C7.417 6.11 8.098 6.74 8.098 8v.027c0 1.715-1.416 2.571-3.567 2.571Zm.953-6.603c0-.617-.49-.965-1.374-.965H2.04v1.982h1.932c.926 0 1.51-.295 1.51-.991v-.026h.001Zm.532 3.75c0-.63-.477-1.018-1.553-1.018H2.041V8.79h2.49c.926 0 1.485-.32 1.485-1.018v-.026ZM92.063 10.537H87.53V1.161h4.423c1.946 0 3.144.95 3.144 2.425v.027c0 1.057-.572 1.647-1.252 2.022 1.102.415 1.783 1.045 1.783 2.305v.026c0 1.714-1.416 2.571-3.567 2.571Zm.953-6.604c0-.616-.49-.964-1.375-.964h-2.069V4.95h1.932c.926 0 1.51-.294 1.51-.991v-.027h.002Zm.53 3.751c0-.63-.476-1.018-1.552-1.018h-2.421V8.73h2.49c.926 0 1.484-.32 1.484-1.018v-.026ZM16.525 10.685c-2.558 0-4.123-1.407-4.123-4.167V1.161h2.096v5.305c0 1.527.775 2.317 2.054 2.317 1.28 0 2.056-.764 2.056-2.251V1.161h2.095v5.29c0 2.84-1.62 4.234-4.178 4.234M30.107 3.112v7.474H28.01V3.112h-2.9V1.21h7.894v1.902h-2.899ZM42.052 10.698c-2.804 0-4.886-2.13-4.886-4.823V5.85c0-2.666 2.041-4.85 4.968-4.85 1.795 0 2.87.59 3.755 1.448L44.556 3.96C43.821 3.303 43.072 2.9 42.12 2.9c-1.605 0-2.762 1.313-2.762 2.92v.027c0 1.608 1.13 2.947 2.762 2.947 1.09 0 1.756-.429 2.505-1.099l1.334 1.327c-.98 1.031-2.07 1.674-3.906 1.674M56 10.574V6.81h-3.865v3.764h-2.096V1.197h2.096V4.91H56V1.197h2.096v9.377H56ZM62.944 10.562V1.185h7.185V3.02h-5.103v1.902h4.492v1.836h-4.492v1.97h5.171v1.834h-7.253ZM80.742 10.55l-2.041-3h-1.647v3h-2.096V1.173h4.356c2.245 0 3.592 1.166 3.592 3.095v.026c0 1.514-.83 2.465-2.041 2.907l2.327 3.349h-2.45Zm.04-6.175c0-.884-.625-1.34-1.646-1.34h-2.082v2.693h2.123c1.02 0 1.606-.536 1.606-1.326v-.027ZM104.071 10.698c-2.939 0-5.049-2.155-5.049-4.822V5.85c0-2.666 2.136-4.85 5.076-4.85 2.94 0 5.05 2.157 5.05 4.822v.027c0 2.666-2.137 4.848-5.076 4.848l-.001.001Zm2.886-4.85c0-1.607-1.198-2.946-2.885-2.946-1.687 0-2.858 1.313-2.858 2.92v.027c0 1.607 1.197 2.946 2.884 2.946 1.688 0 2.859-1.312 2.859-2.92V5.85ZM118.698 10.537l-2.137-3.215-2.149 3.215h-2.383l3.321-4.769-3.185-4.607h2.45l2.001 3.04 2.014-3.04h2.381l-3.183 4.581 3.319 4.795h-2.449ZM122.893 1.824a.64.64 0 0 1-.652.645.643.643 0 0 1-.656-.645c0-.36.291-.636.656-.636.364 0 .652.283.652.636Zm-1.145 0c0 .284.21.509.496.509.287 0 .485-.225.485-.505s-.205-.512-.488-.512a.495.495 0 0 0-.493.508Zm.392.334h-.147v-.637c.059-.011.14-.019.244-.019.121 0 .175.02.222.046a.18.18 0 0 1 .062.14c0 .07-.054.124-.132.147v.008c.062.023.097.07.117.155.019.097.03.136.046.159h-.159c-.019-.023-.031-.082-.05-.155-.012-.07-.05-.101-.132-.101h-.07v.256l-.001.001Zm.004-.36h.07c.082 0 .148-.028.148-.094 0-.059-.043-.097-.136-.097a.362.362 0 0 0-.082.008v.182Z"></path>
                </g>
                <g fill="#228087">
                  <path d="M129.809.9h6.76l.13 2.704h-.234c-.637-1.872-1.326-2.418-2.99-2.418h-.364V5.41h.585c.845 0 1.404-.663 1.612-1.703h.195v3.848h-.221c-.286-1.313-.741-1.807-1.586-1.807h-.585v3.965h1.612V10h-4.914v-.286h.767V1.186h-.767V.9Zm11.534 6.539V6.334c0-1.404-.039-2.418-.767-2.418-.793 0-.832 1.014-.832 2.483v1.014c0 1.508.026 2.483.819 2.483.741 0 .78-.767.78-2.457Zm-4.095-.507c0-2.132 1.274-3.25 3.367-3.25 2.184 0 3.224 1.027 3.224 3.133 0 2.132-.988 3.315-3.302 3.315-2.184 0-3.289-1.17-3.289-3.198Zm11.728-2.756c-.624 0-1.209.936-1.209 2.106v3.484h.923V10h-4.056v-.234h.715v-5.72h-.715v-.234h3.133V5.06c.234-.923.962-1.378 1.742-1.378.767 0 1.378.403 1.378 1.39 0 .742-.39 1.236-1.092 1.236-.871 0-1.287-.546-1.014-1.47h.468c.26-.532 0-.662-.273-.662ZM154.336.9h3.822c2.444 0 3.887.546 3.887 2.587 0 2.21-1.703 2.782-4.225 2.782h-.104v3.484h1.625V10h-5.005v-.247h.845V1.147h-.845V.9Zm3.38.247v4.875h.273c1.092 0 1.378-.754 1.378-2.262v-.624c0-1.47-.312-1.99-1.3-1.99h-.351Zm4.897 5.772c0-2.25 1.534-3.237 3.341-3.237 2.041 0 2.912 1.027 2.834 2.964h-3.666v.507c0 1.534.273 2.574 1.534 2.574.962 0 1.612-.611 1.898-1.612l.234.039c-.299 1.118-.975 1.976-2.821 1.976-2.314 0-3.354-1.326-3.354-3.211Zm2.522-.533h1.339v-.637c0-1.365-.104-1.82-.637-1.82-.455 0-.702.442-.702 1.82v.637Zm5.198 1.755V4.046h-.715v-.234h.715V2.135l2.418-.598v2.275h1.69v.234h-1.69v4.38c0 .768.117 1.184.572 1.184.624 0 1.014-.572 1.131-1.456l.221.026c-.117 1.014-.546 1.95-2.132 1.95-1.287 0-2.21-.377-2.21-1.99Zm5.197 1.989V7.803h.156c.481 1.586 1.274 2.04 2.34 2.04.962 0 1.326-.35 1.326-.844 0-.585-.637-.715-1.625-.988-1.04-.286-2.197-.69-2.197-2.132 0-1.326.91-2.197 2.288-2.197.572 0 .962.143 1.313.299.156.065.208.104.364.104.195 0 .286-.104.455-.43h.143v1.99h-.156c-.468-1.196-1.131-1.69-2.054-1.69-.858 0-1.209.35-1.209.754 0 .598.78.74 1.638.975 1.027.273 2.171.689 2.171 2.223 0 1.482-.962 2.223-2.431 2.223a3.22 3.22 0 0 1-1.56-.377.63.63 0 0 0-.247-.104c-.169 0-.351.117-.559.48h-.156Z"></path>
                </g>
              </svg>
            </Group>
            <Button size="xs" visibleFrom='sm'>Become A Member</Button>
          </Group>
        </Container>
        <Container fluid>
          <Box
            //pt={layoutProps?.padding?.padding_top}
            //pb={layoutProps?.padding?.padding_bottom}
            pt="xs"
            pb="xs"
          >
            <Group justify="space-between" align="center">
              <Group align="center" justify="flex-start">
                {layoutProps?.logo?.logoImage ? (
                  <Image
                    src={layoutProps?.logo?.logoImage.url}
                    width={200}
                    alt={layoutProps?.logo?.logoImage.alt}
                    sizes="(min-width: 45em) 50vw, 100vw"
                  />
                ) : (
                  <Box p="xl">Logo Here</Box>
                )}

                <Group gap="xl" visibleFrom="md">
                  {header?.main?.items.map((item: any) => {
                    const url =
                      item.url.includes('myshopify.com') ||
                      item.url.includes(publicStoreDomain) ||
                      item.url.includes(primaryDomainUrl)
                        ? new URL(item.url).pathname
                        : item.url;
                    if (item.items.length) {
                      return (
                        <Menu
                          key={item.id}
                          trigger="hover"
                          openDelay={10}
                          closeDelay={40}
                          withArrow
                        >
                          <Menu.Target>
                            <Box>
                              <Group gap="1" align="end">
                                {item.title} <RiArrowDownSLine />
                              </Group>
                            </Box>
                          </Menu.Target>
                          <Menu.Dropdown>
                            {item.items.map((subitem: any) => {
                              const suburl =
                                subitem.url.includes('myshopify.com') ||
                                subitem.url.includes(publicStoreDomain) ||
                                subitem.url.includes(primaryDomainUrl)
                                  ? new URL(subitem.url).pathname
                                  : subitem.url;
                              return (
                                <Menu.Item key={subitem.id}>
                                  <NavLink
                                    prefetch="intent"
                                    style={activeLinkStyle}
                                    to={suburl}
                                    end
                                  >
                                    {subitem.title}
                                  </NavLink>
                                </Menu.Item>
                              );
                            })}
                          </Menu.Dropdown>
                        </Menu>
                      );
                    } else {
                      return (
                        <Anchor
                          component={NavLink}
                          key={item.id}
                          prefetch="intent"
                          style={activeLinkStyle}
                          to={url}
                          end
                          px="sm"
                        >
                          {item.title}
                        </Anchor>
                      );
                    }
                  })}
                </Group>
              </Group>
              <Group gap="xs" align="center" justify="flex-end">
                <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
              </Group>
            </Group>
          </Box>
        </Container>

        <Box
          w="100%"
          p={'2px'}
          bg="gray.0"
          style={{
            borderBottom: '1px solid var(--mantine-color-gray-3)',
            borderTop: '1px solid var(--mantine-color-gray-3)',
          }}
        >
          <Container fluid>
            <Carousel
              //withIndicators
              height="100%"
              style={{flex: 1}}
              controlsOffset="xs"
              controlSize={22}
              dragFree
              //withControls={false}
              slideGap="xs"
              align="start"
              slideSize={{
                base: '10%',
                sm: '20%',
                md: '5%',
              }}
            >
              {header?.scroll?.items.map((item: any) => {
                const url =
                  item.url.includes('myshopify.com') ||
                  item.url.includes(publicStoreDomain) ||
                  item.url.includes(primaryDomainUrl)
                    ? new URL(item.url).pathname
                    : item.url;
                if (item.items.length) {
                  return (
                    <Carousel.Slide key={item.id}>
                      <Menu
                        trigger="hover"
                        openDelay={10}
                        closeDelay={40}
                        withArrow
                      >
                        <Menu.Target>
                          <Box>
                            <Group gap="1" align="end">
                              {item.title} <RiArrowDownSLine />
                            </Group>
                          </Box>
                        </Menu.Target>
                        <Menu.Dropdown>
                          {item.items.map((subitem: any) => {
                            const suburl =
                              subitem.url.includes('myshopify.com') ||
                              subitem.url.includes(publicStoreDomain) ||
                              subitem.url.includes(primaryDomainUrl)
                                ? new URL(subitem.url).pathname
                                : subitem.url;
                            return (
                              <Menu.Item key={subitem.id}>
                                <NavLink
                                  prefetch="intent"
                                  style={activeLinkStyle}
                                  to={suburl}
                                  end
                                >
                                  {subitem.title}
                                </NavLink>
                              </Menu.Item>
                            );
                          })}
                        </Menu.Dropdown>
                      </Menu>
                    </Carousel.Slide>
                  );
                } else {
                  return (
                    <Carousel.Slide key={item.id}>
                      <Button
                        component={NavLink}
                        prefetch="intent"
                        style={activeLinkStyle}
                        to={url}
                        end
                        //fw="bold"
                        tt="uppercase"
                        variant="subtle"
                        color="gray"
                        fullWidth
                        //c="primary"
                        //p="xl"
                      >
                        {item.title}
                      </Button>
                    </Carousel.Slide>
                  );
                }
              })}
            </Carousel>
          </Container>
        </Box>
      </Container>
    </>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav role="navigation">
      <Group gap="xs" align="center" justify="flex-end">
        <HeaderMenuMobileToggle />
        <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
          <Suspense fallback="Sign in">
            <Await resolve={isLoggedIn} errorElement="Sign in">
              {(isLoggedIn) =>
                isLoggedIn ? <RiUserFill size="26" /> : <RiUserLine size="26" />
              }
            </Await>
          </Suspense>
        </NavLink>
        <SearchToggle />
        <CartToggle cart={cart} />
      </Group>
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {openDrawer} = useAside();
  return (
    <Burger onClick={() => openDrawer('Menu')} hiddenFrom="md" size="sm" />
  );
}

function SearchToggle() {
  const {openDrawer} = useAside();
  return (
    <Button
      variant="transparent"
      p="0"
      color="dark"
      onClick={() => openDrawer('Search')}
    >
      <RiSearchLine size="26" />
    </Button>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {openDrawer} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <Button
      variant="transparent"
      p="0"
      color="dark"
      onClick={(e) => {
        e.preventDefault();
        openDrawer('Cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
    >
      <Group gap="0">
        <RiShoppingCartLine size="26" />
        {count === null ? (
          <span>&nbsp;</span>
        ) : (
          <Badge ml="-10px" mt="-10px" color="primary" size="xs">
            {count}
          </Badge>
        )}
      </Group>
    </Button>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'primary' : 'black',
  };
}

/*
        
            <Avatar color="primary" radius="xl" w="50" h="50" bd="1px solid primary">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
              >
                <g fill="currentColor">
                  <path d="m43.938 69.605c-4.293-0.1875-8.75-0.26953-13.043-0.26953h-1.457v-0.003907c-0.59766-0.003906-1.1914-0.11719-1.75-0.33203v25.832c0.011719 2.8516 2.3164 5.1562 5.168 5.168h6.7266c2.0781 0.003906 4.0586-0.88672 5.4336-2.4453 1.3711-1.5625 2.0039-3.6406 1.7344-5.6992z" />
                  <path d="m71.438 0.23047c-0.52734-0.31641-1.1836-0.31641-1.707 0-5.875 3.375-31.086 3.9375-40.312 3.9375-0.45312 0-0.88672 0.17969-1.2109 0.5-0.33594 0.31641-0.52344 0.76172-0.51953 1.2266v58.961c0.003906 0.46094 0.19141 0.90625 0.51953 1.2266 0.32422 0.32031 0.75781 0.5 1.2109 0.5 9.2305 0 34.438 0.5 40.312 3.875 0.26172 0.14844 0.55469 0.22656 0.85156 0.23047 0.30078-0.003906 0.59375-0.082031 0.85547-0.23047 0.53906-0.30469 0.875-0.87891 0.875-1.5v-67.25c-0.003906-0.61328-0.33984-1.1797-0.875-1.4766zm-29.77 20.188c-1.8164 0-3.4492-1.0938-4.1406-2.7695-0.69141-1.6797-0.30469-3.6055 0.98047-4.8867 1.2852-1.2773 3.2148-1.6562 4.8867-0.95703 1.6719 0.69922 2.7578 2.3398 2.75 4.1523 0 1.1875-0.47266 2.3242-1.3125 3.1602-0.83984 0.83594-1.9805 1.3047-3.1641 1.3008z" />
                </g>
              </svg>
              </Avatar>
*/
