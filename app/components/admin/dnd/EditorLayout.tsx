import {useOutletContext, useRouteLoaderData} from '@remix-run/react';
import {useDisclosure, useToggle} from '@mantine/hooks';
import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  CSSVariablesResolver,
  Group,
  MantineProvider,
  ScrollArea,
} from '@mantine/core';

import {RiComputerLine, RiEyeLine, RiSmartphoneLine} from '@remixicon/react';
import ShowForm from '~/components/admin/dnd/forms/ShowForm';
import {Aside} from '~/components/layout/Aside';
import {RootLoader} from '~/root';
import ModalAddSection from './ModalAddSection';
import {getCssResolve} from './theme/lib/theme';
import useThemeUtils from './useEditorUtils';
import AppNavbarPage from './AppNavbarPage';
import AppNavbarTemplate from './AppNavbarTemplate';

export default function EditorLayout({
  template = {},
  type = 'template',
  pageId = '',
  children,
}) {
  const root: any = useRouteLoaderData<RootLoader>('root');

  const {theme, editorContent, viewport, setViewport, templates}: any =
    useOutletContext();

  const [mobileOpened, {toggle: toggleMobile}] = useDisclosure();
  const [desktopOpened, {toggle: toggleDesktop}] = useDisclosure(true);

  const [viewportColor, toggle] = useToggle([true, false]);
  const cssResolver: CSSVariablesResolver = (theme) =>
    getCssResolve(theme.other);
  const {addContent} = useThemeUtils();
  return (
    <MantineProvider
      theme={theme}
      forceColorScheme={theme?.other?.colorScheme}
      cssVariablesResolver={cssResolver}
    >
      <Aside.Provider>
        <Aside
          cart={root.cart}
          header={root.header}
          publicStoreDomain={root.publicStoreDomain}
        />
        <AppShell
          header={{height: 40}}
          navbar={{
            width: 300,
            breakpoint: 'sm',
            collapsed: {mobile: !mobileOpened, desktop: !desktopOpened},
          }}
          aside={{
            width: 300,
            breakpoint: 'sm',
            collapsed: {mobile: !mobileOpened, desktop: !desktopOpened},
          }}
          p="0"
          m="0"
          bg={'var(--mantine-color-body)'}
        >
          <AppShell.Header bg="gray.4" style={{zIndex: 0}}>
            <Group pt="2" justify="center">
              <ActionIcon.Group>
                <ActionIcon
                  color="gray.7"
                  size="lg"
                  onClick={() => {
                    setViewport('100%');
                    toggle();
                  }}
                >
                  <RiComputerLine size="24" />
                </ActionIcon>
                <ActionIcon
                  color="gray.7"
                  size="lg"
                  onClick={() => {
                    setViewport('24.375rem');
                    toggle();
                  }}
                >
                  <RiSmartphoneLine size="24" />
                </ActionIcon>
                <ActionIcon color="gray.7" size="lg" onClick={toggleDesktop}>
                  <RiEyeLine size="24" />
                </ActionIcon>
              </ActionIcon.Group>
            </Group>
          </AppShell.Header>
          <AppShell.Navbar p="0" component={ScrollArea} bg="gray.3">
            <Group>
              <Burger
                opened={mobileOpened}
                onClick={toggleMobile}
                hiddenFrom="sm"
                size="sm"
              />
            </Group>
            {type === 'page' && (
              <AppNavbarPage pageId={pageId}/>
            )}

            {type === 'template' && (
              <AppNavbarTemplate template={template}/>
            )}
          </AppShell.Navbar>
          <AppShell.Main>
            <Box
              px={0}
              mx="auto"
              style={{
                width: viewport,
                transform: `scaleX(${viewport})`,
                transition: 'width 400ms ease',
                fontFamily: theme?.fonts?.bodyClass,
                bgColor: 'var(--mantine-color-body)',
              }}
            >
              <Box bg={'var(--mantine-color-body)'}>{children}</Box>
            </Box>
          </AppShell.Main>
          <AppShell.Aside p="0" component={ScrollArea} bg="gray.3" c="dark">
            <ShowForm />
          </AppShell.Aside>
        </AppShell>
      </Aside.Provider>
      <ModalAddSection />
    </MantineProvider>
  );
}

export const handle = {
  breadcrumb: () => <span>Layouts</span>,
};
