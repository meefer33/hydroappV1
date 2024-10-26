import {useOutletContext, useRouteLoaderData} from '@remix-run/react';
import {
  useDisclosure,
  useToggle,
} from '@mantine/hooks';
import {
  ActionIcon,
  AppShell,
  Box,
  Burger,

  Container,
  CSSVariablesResolver,
  Group,
  MantineProvider,
  ScrollArea,
  Tabs,
} from '@mantine/core';

import {
  RiComputerLine,
  RiEyeLine,
  RiLayoutGridLine,
  RiSettings2Fill,
  RiSmartphoneLine,
} from '@remixicon/react';
import ThemeForm from '~/components/admin/dnd/forms/ThemeForm';
import LayoutForm from '~/components/admin/dnd/forms/LayoutForm';
import ThemeHeader from '~/components/admin/dnd/Header';
import ShowForm from '~/components/admin/dnd/forms/ShowForm';
import {Aside} from '~/components/layout/Aside';
import {RootLoader} from '~/root';
import ButtonAddSection from './ButtonAddSection';
import ModalAddSection from './ModalAddSection';
import {getCssResolve} from './theme/lib/theme';
import DndOutline from './DndOutline';

export default function EditorLayout({children}) {
  const root: any = useRouteLoaderData<RootLoader>('root');

  const {
    themes,
    layouts,
    theme,
    editorContent,
    viewport,
    setViewport,
  }: any = useOutletContext();

  const [mobileOpened, {toggle: toggleMobile}] = useDisclosure();
  const [desktopOpened, {toggle: toggleDesktop}] = useDisclosure(true);

  const [viewportColor, toggle] = useToggle([true, false]);
  const cssResolver: CSSVariablesResolver = (theme) => getCssResolve(themes);
  //console.log('metaData', editorContent);
  return (
    <MantineProvider
      theme={theme}
      forceColorScheme={theme?.other?.colorScheme}
      cssVariablesResolver={cssResolver}
    >
      <Container
        pos="fixed"
        top="0"
        //right="0"
        w="100%"
        fluid
        style={{
          zIndex: 999,
        }}
      >
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
              <RiEyeLine
                size="24"
              />
            </ActionIcon>
          </ActionIcon.Group>
        </Group>
      </Container>
      <Aside.Provider>
        <Aside
          cart={root.cart}
          header={root.header}
          publicStoreDomain={root.publicStoreDomain}
        />
        <AppShell
          layout="alt"
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
          <AppShell.Navbar p="0" component={ScrollArea} bg="gray.3">
            <Group>
              <Burger
                opened={mobileOpened}
                onClick={toggleMobile}
                hiddenFrom="sm"
                size="sm"
              />
            </Group>
            <Tabs
              variant="pills"
              defaultValue="content"
              radius="0"
              color="gray.7"
            >
              <Tabs.List>
                <Tabs.Tab
                  value="content"
                  leftSection={<RiLayoutGridLine size={16} />}
                ></Tabs.Tab>
                <Tabs.Tab
                  value="settings"
                  leftSection={<RiSettings2Fill size={16} />}
                ></Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="content">
                <Box p="sm">
                  <DndOutline
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
          <AppShell.Main>
            <Box
              px={0}
              mx="auto"
              style={{
                width: viewport,
                transform: `scaleX(${viewport})`,
                transition: 'width 400ms ease',
                fontFamily: themes[0].fields?.theme.fonts.bodyClass,
                bgColor: 'var(--mantine-color-body)',
              }}
            >
              <Box bg={'var(--mantine-color-body)'}>
                <ThemeHeader
                  layout={layouts[0].fields?.layout}
                  theme={themes[0].fields?.theme}
                />
                {children}
              </Box>
            </Box>
          </AppShell.Main>
          <AppShell.Aside p="0" component={ScrollArea} bg="gray.3" c="dark">
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
