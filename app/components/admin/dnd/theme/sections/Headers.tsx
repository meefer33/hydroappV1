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
  SimpleGrid,
  Title,
} from '@mantine/core';
import {useElementSize, useHeadroom} from '@mantine/hooks';
import {NavLink, useRouteLoaderData} from '@remix-run/react';
import {
  RiArrowDownSLine,
  RiSearchLine,
  RiShoppingCartLine,
  RiUserFill,
  RiUserLine,
} from '@remixicon/react';
import {CartViewPayload, Image, useAnalytics} from '@shopify/hydrogen';
import {useAside} from '~/components/layout/Aside';
import {RootLoader} from '~/root';
import {defaultHeader, DefaultHeader} from '../lib/metaTypes';

const bpWidth = 992;

export default function Headers({
  settings,
  theme,
}: {
  settings: DefaultHeader;
  theme: any;
}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  const pinned = useHeadroom({fixedAt: 120});
  const layout = settings || defaultHeader;

  return (
    <HeaderMenu
      rootData={rootData}
      layout={layout}
      theme={theme}
      pinned={pinned}
    />
  );
}

function HeaderMenu({rootData, layout, theme, pinned}: any) {
  const {ref, width, height} = useElementSize();
  return (
    <Box
      ref={ref}
      component="div"
      px="0"
      //bg="white"
      w="100%"
      pos="sticky"
      top="0"
      left="0"
      right="0"
      style={{
        //boxShadow: '0 1px 3px -1px rgba(0, 0, 0, 0.1)',
        //height: rem(40),
        zIndex: 1,
        transform: `translate3d(0, ${
          pinned ? 0 : width < bpWidth ? rem(-115) : 0
        }, 0)`,
        transition: 'transform 400ms ease',
        backgroundColor: 'var(--mantine-color-body)',
        //borderBottom: '1px solid var(--mantine-color-gray-3)',
      }}
    >
      <MainMenuWrapper mainWidth={width}>
        <Box>
          <Group
            align="center"
            justify={width < bpWidth ? 'center' : 'flex-start'}
            pt={layout?.padding?.top}
            pb={layout?.padding?.bottom}
          >
            <Logo layout={layout} theme={theme} />
            <Container
              ml="xl"
              styles={{
                root: {
                  display: width < bpWidth ? 'none' : 'block',
                },
              }}
            >
              <MainMenu menu={rootData?.header?.main?.items} />
            </Container>
          </Group>
        </Box>
        <Group
          align="center"
          justify={width < bpWidth ? 'space-between' : 'flex-end'}
        >
          <HeaderCtas
            isLoggedIn={rootData?.isLoggedIn}
            cart={rootData?.cart}
            mainWidth={width}
          />
        </Group>
      </MainMenuWrapper>
      <HeaderScroller scrollBackground={layout?.scrollMenu?.scrollBg} />
    </Box>
  );
}

function Logo({layout, theme}: any) {
  return (
    <>
      {layout?.logo?.image?.image && (
        <Image
          src={layout?.logo?.image?.image?.url}
          // height={50}
          width={layout?.logo?.width}
          alt={layout?.logo?.image?.image?.alt}
          sizes="(min-width: 45em) 50vw, 100vw"
          //className=" w-full max-w-80 md:max-w-80"
        />
      )}
      <Box>
        {layout?.heading?.text && (
          <Title
            order={1}
            c={`${
              layout?.heading?.textColor ? layout?.heading?.textColor : ''
            }`}
            fz={50}
            mb="0"
            ff={theme?.other?.fonts?.headingsClass}
          >
            <Box
              lts={
                layout?.heading?.textSpacing ? layout?.heading?.textSpacing : 0
              }
            >
              {layout?.heading?.text}
            </Box>
          </Title>
        )}
        {layout?.heading?.subText && (
          <Title
            order={5}
            c={`${
              layout?.heading?.subTextColor ? layout?.heading?.subTextColor : ''
            }`}
            lts={
              layout?.heading?.subTextSpacing
                ? layout?.heading?.subTextSpacing
                : 0
            }
            ff={theme?.other?.fonts?.headingsClass}
          >
            <Box mt="-10">{layout?.heading?.subText}</Box>
          </Title>
        )}
      </Box>
    </>
  );
}

function MainMenu({menu}: any) {
  return (
    <Group>
      {menu.map((item: any) => {
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
              to={url.pathname}
              c={'var(--mantine-color-text)'}
              td="none"
            >
              {item.title}
            </Box>
          );
        }
      })}
    </Group>
  );
}

function MainMenuWrapper({mainWidth, children}: any) {
  return (
    <>
      {mainWidth < bpWidth ? (
        <SimpleGrid
          type="container"
          cols={{base: 1, '992px': 2}}
          spacing="0"
          verticalSpacing="0"
          bd="4"
          mx="10"
        >
          {children}
        </SimpleGrid>
      ) : (
        <Group bd="4" mx="10" grow wrap="nowrap" preventGrowOverflow={false}>
          {children}
        </Group>
      )}
    </>
  );
}

function HeaderScroller({scrollBackground}: any) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  const primaryDomainUrl = rootData?.header.shop.primaryDomain.url;
  return (
    <Box
      w="100%"
      p={'2px'}
      bg={scrollBackground ? scrollBackground : 'gray-1'}
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
          controlsOffset="0"
          controlSize={22}
          dragFree
          //withControls={false}
          slideGap="0"
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
                          subitem.url.includes(rootData?.publicStoreDomain) ||
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
                    color="primary"
                    fullWidth
                    c="primary"
                    ml="sm"
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
  );
}

function HeaderCtas({isLoggedIn, cart, mainWidth}: any) {
  const {openDrawer} = useAside();
  return (
    <>
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        <Button
          variant="transparent"
          p="0"
          color="dark"
          onClick={() => openDrawer('Search')}
        >
          {isLoggedIn ? <RiUserFill size="26" /> : <RiUserLine size="26" />}
        </Button>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
      <HeaderMenuMobileToggle mainWidth={mainWidth} />
    </>
  );
}

function HeaderCtasMobile({isLoggedIn, cart}: any) {
  return (
    <Container
      fluid
      px="0"
      bg="accent"
      pos="fixed"
      bottom="0"
      left="0"
      right="0"
      styles={{
        root: {
          //boxShadow: '0 1px 3px -1px rgba(0, 0, 0, 0.1)',
          //height: rem(40),
          zIndex: 2,
        },
      }}
    >
      <nav role="navigation">
        <Group gap="8" align="center" justify="flex-end">
          <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
            {isLoggedIn ? <RiUserFill size="26" /> : <RiUserLine size="26" />}
          </NavLink>
          <SearchToggle />
          <CartToggle cart={cart} />
        </Group>
      </nav>
    </Container>
  );
}

function HeaderMenuMobileToggle({mainWidth}: any) {
  const {openDrawer} = useAside();
  return (
    <Burger
      onClick={() => openDrawer('Menu')}
      size="md"
      styles={{
        root: {
          display: mainWidth < bpWidth ? 'block' : 'none',
        },
      }}
    />
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
          <Badge color="primary" size="sm">
            {count}
          </Badge>
        )}
      </Group>
    </Button>
  );
}

function CartToggle({cart}: any) {
  if (!cart) return <CartBadge count={0} />;
  return <CartBadge count={cart.totalQuantity || 0} />;
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
