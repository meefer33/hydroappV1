import {LoaderFunctionArgs} from '@remix-run/node';
import {
  useLoaderData,
  useOutletContext,
  useRouteLoaderData,
} from '@remix-run/react';
import {parser} from '~/lib/parseContent';
import {GetMetaobjectByHandle} from '~/graphql/admin/GetMetaobjectByHandle';
import {useDisclosure, useListState, useToggle} from '@mantine/hooks';
import {useState} from 'react';
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
import {ItemType} from '~/components/admin/dnd/DND';
import {UniqueIdentifier} from '@dnd-kit/core/dist/types';
import {nanoid} from 'nanoid';
import DndSortableContext from '~/components/admin/dnd/SortableContext';
import DndKit from '~/components/admin/dnd/DndKit';
import {RootLoader} from '~/root';
import {
  RiComputerLine,
  RiEdit2Fill,
  RiEyeLine,
  RiSettings2Fill,
  RiSmartphoneLine,
} from '@remixicon/react';
import ThemeForm from '~/components/admin/dnd/forms/ThemeForm';
import {Aside} from '~/components/layout/Aside';
import {buildTheme} from '~/components/admin/dnd/theme/themeUtils';
import SelectOverlay from '~/components/admin/dnd/SelectOverlay';
import LayoutForm from '~/components/admin/dnd/forms/LayoutForm';
import ThemeHeader from '~/components/admin/dnd/theme/Header';
import Section from '~/components/admin/dnd/components/Section';
import SectionForm from '~/components/admin/dnd/forms/SectionForm';

export const loader = async ({context, params}: LoaderFunctionArgs) => {
  const {admin} = context;
  let breadcrumb = params['*'];
  let handle = params['*']?.split('/').pop();

  //get content page
  const getContent = await admin.request(GetMetaobjectByHandle, {
    variables: {
      handle: {type: 'pages', handle: handle},
    },
  });
  const content = parser(getContent?.data?.metaobjectByHandle);
  //if no content yet create the

  return {content, breadcrumb};
};

export default function EditContent() {
  const root: any = useRouteLoaderData<RootLoader>('root');
  const {themes, layouts, saveTheme, saveLayout}: any = useOutletContext();
  const {content, breadcrumb}: any = useLoaderData<typeof loader>();
  const [theme, setTheme] = useState(buildTheme(themes[0]?.fields?.theme));
  const [viewport, setViewport] = useState('100%');
  const [mobileOpened, {toggle: toggleMobile}] = useDisclosure();
  const [desktopOpened, {toggle: toggleDesktop}] = useDisclosure(true);
  const [viewportColor, toggle] = useToggle([true, false]);
  const [isSaving, setIsSaving] = useState(false);

  //dnd state
  const sortContainerId = 'main';
  const [items, setItems] = useState<ItemType[]>([]);
  const [activeItem, setActiveItem] = useState<ItemType | null>(null);
  const [selectedItem, setSelectedItem] = useState();
  const [sections, handlers] = useListState([]);
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
        <DndKit
          sortContainerId={sortContainerId}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          sections={sections}
          handlers={handlers}
        >
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
                  <ThemeForm
                    theme={theme}
                    setTheme={setTheme}
                    saveTheme={saveTheme}
                    config={themes[0].fields?.theme}
                  />
                  <LayoutForm
                    saveLayout={saveLayout}
                    layout={layouts[0].fields?.layout}
                  />
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
                <SelectOverlay>
                  <ThemeHeader
                    layout={layouts[0].fields?.layout}
                    theme={themes[0].fields?.theme}
                  />
                </SelectOverlay>
                <DndSortableContext
                  sections={sections}
                  handlers={handlers}
                  sortContainerId={sortContainerId}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
              </Box>
            </AppShell.Main>
            <AppShell.Aside p="0" component={ScrollArea} bg="gray.4" c="dark">
              Active Item
              {selectedItem}
              <SectionForm    
                sections={sections}
                  handlers={handlers}
                  selectedItem={selectedItem}
                  />
            </AppShell.Aside>
          </AppShell>
        </DndKit>
      </Aside.Provider>
    </MantineProvider>
  );
}

export const handle = {
  breadcrumb: () => <span>Layouts</span>,
};
