import {useOutletContext, useRouteLoaderData} from '@remix-run/react';
import {useDisclosure, useToggle} from '@mantine/hooks';
import {
  AppShell,
  Box,
  Burger,
  Button,
  CSSVariablesResolver,
  Group,
  MantineProvider,
  Modal,
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
import LayoutForm from '~/components/admin/dnd/forms/LayoutForm';
import ThemeHeader from '~/components/admin/dnd/Header';
import ShowForm from '~/components/admin/dnd/forms/ShowForm';
import {Aside} from '~/components/layout/Aside';
import {RootLoader} from '~/root';
import DndMeta from './DndMeta';
import ButtonAddSection from './ButtonAddSection';
import ModalAddSection from './ModalAddSection';
import { getCssResolve } from './theme/lib/theme';
import MetaContentEditor from './MetaContentEditor';
import MetaContent from './theme/MetaContent';

export default function EditorLayout() {
  const root: any = useRouteLoaderData<RootLoader>('root');
  const {
    themes,
    layouts,
    theme,
    editorContent,
    metaData,
    viewport,
    setViewport,
    setItem
  }: any = useOutletContext();

  const [mobileOpened, {toggle: toggleMobile}] = useDisclosure();
  const [desktopOpened, {toggle: toggleDesktop}] = useDisclosure(true);

  const [viewportColor, toggle] = useToggle([true, false]);
  const cssResolver: CSSVariablesResolver = (theme) => getCssResolve(themes);
  console.log('metaData', theme);
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
          //layout="alt"
          header={{height: 60}}
          //footer={{height: 60}}
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
          padding="0"
          //disabled={disabled}
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
            <Group>
              <Burger
                opened={mobileOpened}
                onClick={toggleMobile}
                hiddenFrom="sm"
                size="sm"
              />
            </Group>
            <Tabs variant="default" defaultValue="content">
              <Tabs.List>
                <Tabs.Tab
                  value="content"
                  leftSection={<RiEdit2Fill size={16} />}
                ></Tabs.Tab>
                <Tabs.Tab
                  value="settings"
                  leftSection={<RiSettings2Fill size={16} />}
                ></Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="content">
                <Box p="sm">
                <DndMeta
                  content={editorContent?.fields?.content}
                  id={editorContent?.id}
                  updateKey="content"
                />
                </Box>
                <ButtonAddSection data={editorContent} />
              </Tabs.Panel>

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
              <MetaContentEditor content={editorContent?.fields?.content}  />
            </Box>
          </AppShell.Main>
          <AppShell.Aside p="0" component={ScrollArea} bg="gray.4" c="dark">
            Active Item
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
