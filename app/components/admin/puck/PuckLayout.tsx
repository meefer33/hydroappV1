import {Config, DropZone, Puck, resolveAllData, usePuck} from '@measured/puck';
import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  ScrollArea,
} from '@mantine/core';
import {useDisclosure, useToggle} from '@mantine/hooks';
import {RiComputerLine, RiEyeLine, RiSmartphoneLine} from '@remixicon/react';
import {useState} from 'react';
import SavePuck from './SavePuck';
import PuckPreview from './PuckPreview';
import LoadSectionModal from './LoadSectionModal';

//import AssistantBotAI from "../AssistantBotAI";

export default function PuckLayout({
  config,
  contentData = {},
  saveMeta = {},
  type = '',
  viewport = '100%',
  setViewport,
  theme,
}: {
  config: Config;
  contentData?: any;
  saveMeta?: any;
  type?: string;
  viewport: string;
  setViewport?: any;
  theme: any;
}) {
  const [mobileOpened, {toggle: toggleMobile}] = useDisclosure();
  const [desktopOpened, {toggle: toggleDesktop}] = useDisclosure(true);
  const [viewportColor, toggle] = useToggle([true, false]);
  const [isSaving, setIsSaving] = useState(false);
  const [loadSectionOpened, {open: loadSectionOpen, close: loadSectionClose}] =
    useDisclosure(false);
    const [loadSectionId, setLoadSectionId] = useState<string>('');
  return (
    <AppShell
      layout="alt"
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
      <Puck
        onAction={(action, appState, prevAppState) => {
          console.log('New component was inserted', action, appState,prevAppState);
          if(action.type === 'insert' && action.componentType === "Section") {
            //insert into theme_components metaobjects
            
            setLoadSectionId(action.id)
            loadSectionOpen();
          }
          if(action.type === 'remove' && action.zone === "root:main-content") {
            //remove from theme_components metaobjects
            const removeId = prevAppState?.data?.zones["root:main-content"][action.index].props?.id
            console.log('removeId',removeId)
          }
         // loadSectionOpen();
        }}
        onChange={(data) => {
          console.log("Puck data was updated", data);
        }}
        iframe={{
          enabled: false,
        }}
        config={config}
        data={contentData || {}}
        overrides={{
          //puck:  ({ children }) => <DropZone zone="main-content" allow={['Section']} />,
        }}
      >
        <LoadSectionModal loadSectionOpened={loadSectionOpened} loadSectionClose={loadSectionClose} loadSectionId={loadSectionId} />
        <AppShell.Header bg="gray.3" bd="0">
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
              <SavePuck
                saveMeta={saveMeta}
                type={type}
                setIsSaving={setIsSaving}
              />
            </Group>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md" bg="gray.3" bd="0">
          <Group>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
          </Group>
          <Box c="dark">
            <Puck.Components />
          </Box>
          <Puck.Outline />
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
              fontFamily: theme?.other?.fonts?.body?.class,
            }}
          >
            <LoadingOverlay
              visible={isSaving}
              zIndex={1000}
              overlayProps={{radius: 'sm', color: '#fff', backgroundOpacity: 1}}
            />

            {!desktopOpened ? (
              <PuckPreview config={config} />
            ) : (
              <Box component={Puck.Preview} />
            )}
          </Box>
        </AppShell.Main>
        <AppShell.Aside component={ScrollArea} bg="gray.3" bd="0" ff="inherit">
          <Box component={Puck.Fields} />
        </AppShell.Aside>
      </Puck>
    </AppShell>
  );
}
