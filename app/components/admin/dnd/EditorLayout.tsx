import {useOutletContext, useRouteLoaderData} from '@remix-run/react';
import {useDisclosure, useToggle} from '@mantine/hooks';
import {useEffect, useState} from 'react';
import {
  AppShell,
  Box,
  Button,
  CSSVariablesResolver,
  Group,
  MantineProvider,
  ScrollArea,
  Tabs,
} from '@mantine/core';

import {
  RiComputerLine,
  RiEdit2Fill,
  RiEyeLine,
  RiSettings2Fill,
  RiSmartphoneLine,
} from '@remixicon/react';
import ThemeForm from '~/components/admin/dnd/forms/ThemeForm';
import SelectOverlay from '~/components/admin/dnd/SelectOverlay';
import LayoutForm from '~/components/admin/dnd/forms/LayoutForm';
import ThemeHeader from '~/components/admin/dnd/theme/Header';
import ShowForm from '~/components/admin/dnd/forms/ShowForm';
import {Aside} from '~/components/layout/Aside';
import DndKit from './DndKit';
import {useEditorContext} from './EditorContext';
import {RootLoader} from '~/root';
import DndSortableContext from './DndSortableContext';

export default function EditorLayout({content, handle}: any) {
  const root: any = useRouteLoaderData<RootLoader>('root');
  const {themes, layouts}: any = useOutletContext();
  const {theme, handlers, setHandle, sections, item}: any = useEditorContext();
  const [viewport, setViewport] = useState('100%');
  const [desktopOpened, {toggle: toggleDesktop}] = useDisclosure(true);
  const [viewportColor, toggle] = useToggle([true, false]);

  const cssResolver: CSSVariablesResolver = (theme) => ({
    variables: {
      '--mantine-color-body':
        themes[0]?.fields?.theme?.colorScheme === 'dark'
          ? themes[0]?.fields?.theme?.themes?.dark?.bgColor
          : themes[0]?.fields?.theme?.themes?.light?.bgColor,
      '--mantine-color-text':
        themes[0]?.fields?.theme.colorScheme === 'dark'
          ? themes[0]?.fields?.theme?.themes?.dark?.textColor
          : themes[0]?.fields?.theme?.themes?.light?.textColor,
      '--divider-color':
        themes[0]?.fields?.theme?.colorScheme === 'dark'
          ? '--mantine-color-dark-4'
          : '--mantine-color-dark-4',
    },
    light: {
      '--mantine-color-body': themes[0]?.fields?.theme?.themes?.light?.bgColor,
      '--mantine-color-text':
        themes[0]?.fields?.theme?.themes?.light?.textColor,
    },
    dark: {
      '--mantine-color-body': themes[0]?.fields?.theme?.themes?.dark?.bgColor,
      '--mantine-color-text': themes[0]?.fields?.theme?.themes?.dark?.textColor,
    },
  });

  useEffect(() => {
    handlers.setState(content);
    setHandle(handle);
    console.log('sect', sections);
  }, []);

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
          header={{height: 60}}
          navbar={{
            width: 300,
            breakpoint: 'sm',
            // collapsed: {mobile: !opened},
          }}
          aside={{
            width: 300,
            breakpoint: 'md',
            collapsed: {desktop: false, mobile: true},
          }}
        >
          <AppShell.Header bg="gray.4" c="dark">
            <Group h="100%" px="md" justify="end">
              <Group gap="xl" mr={50}>
                <Group gap="xs">
                  <Button
                    variant="transparent"
                    c={viewportColor ? 'gray.7' : 'gray.5'}
                    px={0}
                    onClick={() => {
                      setViewport('100%');
                      toggle();
                    }}
                  >
                    <RiComputerLine size="30" />
                  </Button>
                  <Button
                    variant="transparent"
                    c={viewportColor ? 'gray.5' : 'gray.7'}
                    px={0}
                    onClick={() => {
                      setViewport('24.375rem');
                      toggle();
                    }}
                  >
                    <RiSmartphoneLine size="30" />
                  </Button>
                </Group>
                <Button
                  variant="transparent"
                  c={desktopOpened ? 'gray.5' : 'gray.7'}
                  px={0}
                  onClick={toggleDesktop}
                >
                  <RiEyeLine
                    //visibleFrom="sm"
                    size="30"
                  />
                </Button>
              </Group>
            </Group>
          </AppShell.Header>
          <AppShell.Navbar p="0" component={ScrollArea} bg="gray.4" c="dark">
            <Tabs variant="default" defaultValue="settings">
              <Tabs.List>
                <Tabs.Tab
                  value="gallery"
                  leftSection={<RiEdit2Fill size={16} />}
                ></Tabs.Tab>
                <Tabs.Tab
                  value="settings"
                  leftSection={<RiSettings2Fill size={16} />}
                ></Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="gallery">Gallery tab content</Tabs.Panel>

              <Tabs.Panel value="settings">
                <ThemeForm />
                <LayoutForm />
              </Tabs.Panel>
            </Tabs>
          </AppShell.Navbar>
          <AppShell.Main component={ScrollArea}>
            <Box
              h={'calc(100vh - var(--app-shell-header-offset, 0rem) - 40px'}
              px={0}
              mx="auto"
              style={{
                width: viewport,
                transform: `scaleX(${viewport})`,
                transition: 'width 400ms ease',
                fontFamily: themes[0].fields?.theme.fonts.bodyClass,
              }}
            >
              <ThemeHeader
                layout={layouts[0].fields?.layout}
                theme={themes[0].fields?.theme}
              />
              <DndKit>
                <DndSortableContext />
              </DndKit>
            </Box>
          </AppShell.Main>
          <AppShell.Aside p="0" component={ScrollArea} bg="gray.4" c="dark">
            Active Item
            <ShowForm />
          </AppShell.Aside>
        </AppShell>
      </Aside.Provider>
    </MantineProvider>
  );
}

export const handle = {
  breadcrumb: () => <span>Layouts</span>,
};
