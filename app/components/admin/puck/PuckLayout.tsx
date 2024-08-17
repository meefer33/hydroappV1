import {Config, Puck, resolveAllData} from '@measured/puck';
import {AppShell, Box, Burger, Button, Group, ScrollArea} from '@mantine/core';
import {useDisclosure, useToggle} from '@mantine/hooks';
import {RiComputerLine, RiSmartphoneLine} from '@remixicon/react';
import {useState} from 'react';
import SavePuck from './SavePuck';

//import AssistantBotAI from "../AssistantBotAI";

export default function PuckLayout({
  config,
  contentData = {},
  saveMeta = {},
  type = '',
  viewport = '100%',
  setViewport,
  theme
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

  //const updatedData = await resolveAllData(contentData?.data || {}, config);
  console.log(saveMeta.fields?.settings?.other?.fonts);

  return (
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
      //disabled={true}
    >
      <Puck
        iframe={{
          enabled: false,
        }}
        config={config}
        data={contentData?.data || {}}
      >
        <AppShell.Header bg="gray.3" bd="0">
          <Group h="100%" px="md" justify="space-between">
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
              color="dark"
            />
            <Group gap="xl" mr={50}>
              <Group gap="xs">
                <Button
                  variant="transparent"
                  c={viewportColor ? 'white' : 'black'}
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
                  c={viewportColor ? 'black' : 'white'}
                  px={0}
                  onClick={() => {
                    setViewport('24.375rem');
                    toggle();
                  }}
                >
                  <RiSmartphoneLine size="30" />
                </Button>
              </Group>
              <SavePuck saveMeta={saveMeta} type={type} />
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
            <Puck.Preview />
          </Box>
        </AppShell.Main>
        <AppShell.Aside component={ScrollArea} bg="gray.3" bd="0" ff="inherit">
          <Box
          component={Puck.Fields}

          />
         
        </AppShell.Aside>
      </Puck>
    </AppShell>
  );
}
