import {Carousel} from '@mantine/carousel';
import {
  Badge,
  Box,
  Burger,
  Button,
  Container,
  Group,
  Menu,
  rem,
  Title,
} from '@mantine/core';
import {useHeadroom, useViewportSize} from '@mantine/hooks';
import {Await, NavLink, useRouteLoaderData} from '@remix-run/react';
import {
  RiArrowDownSLine,
  RiSearchLine,
  RiShoppingCartLine,
  RiUserFill,
  RiUserLine,
} from '@remixicon/react';
import {CartViewPayload, Image, useAnalytics} from '@shopify/hydrogen';
import {Suspense} from 'react';
import {useAside} from '~/components/layout/Aside';
import {RootLoader} from '~/root';

export default function Header({...props}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  console.log('props', rootData);
  const pinned = useHeadroom({fixedAt: 100});
  const {height, width} = useViewportSize();
  const pinHeight = width < 600 ? -70 : -70;
  const primaryDomainUrl = rootData?.header.shop.primaryDomain.url;
  return (
    <Box h="200px">
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
        <Container fluid className="border-b border-slate-100 shadow-sm" bd="4">
          <Box
            pt={props?.padding?.padding_top}
            pb={props?.padding?.padding_bottom}
          >
            <Group justify="space-between" align="center">
              <Group align="center" justify="flex-start" gap="8">
                {props?.logo?.logoImage && (
                  <Image
                    src={props?.logo?.logoImage.url}
                    // height={50}
                    width={props?.logo?.logoWidth}
                    alt={props?.logo?.logoImage.alt}
                    sizes="(min-width: 45em) 50vw, 100vw"
                    //className=" w-full max-w-80 md:max-w-80"
                  />
                )}
                {props?.logo?.logoText && (
                  <Title
                    order={1}
                    c={`${
                      props?.logo?.logoColor ? props?.logo?.logoColor : ''
                    }`}
                  >
                    <Box
                      lts={
                        props?.logo?.logoTextSpacing
                          ? Number(props?.logo?.logoTextSpacing)
                          : 0
                      }
                    >
                      {props?.logo?.logoText}
                    </Box>
                  </Title>
                )}
                <Box w="xl"></Box>
                <Group gap="xl" visibleFrom="md">
                  {rootData?.header?.main?.items.map((item: any) => {
                    const url = new URL(item.url);
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
                              const suburl = new URL(subitem.url);
                              return (
                                <Menu.Item key={subitem.id}>
                                  <NavLink prefetch="none" to={suburl}>
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
                        <Box
                          component={NavLink}
                          key={item.id}
                          prefetch="none"
                          to={url}
                          c={'var(--mantine-color-text)'}
                          td="none"
                        >
                          {item.title}
                        </Box>
                      );
                    }
                  })}
                </Group>
              </Group>
              <Group gap="xs" align="center" justify="flex-end">
                <HeaderCtas
                  isLoggedIn={rootData?.isLoggedIn}
                  cart={rootData?.cart}
                />
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
              {rootData?.header?.scroll?.items.map((item: any) => {
                const url =
                  item.url.includes('myshopify.com') ||
                  item.url.includes(rootData?.publicStoreDomain) ||
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
                              subitem.url.includes(
                                rootData?.publicStoreDomain,
                              ) ||
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
    </Box>
  );
}

function HeaderCtas({isLoggedIn, cart}: any) {
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

function CartToggle({cart}: any) {
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
