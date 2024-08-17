import {type UIMatch, Link, useMatches} from '@remix-run/react';
import {
  ActionIcon,
  Anchor,
  AppShell,
  Box,
  Breadcrumbs,
  Burger,
  Group,
  useMantineColorScheme,
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {RiArrowRightLine, RiMoonLine, RiSunLine} from '@remixicon/react';
import Logo from './Logo';
import DashboardMainMenu from './DashboardMainMenu';

export function DashboardLayout({children = null}: {children: any}) {
  const matches = useMatches();
  const [opened, {toggle}] = useDisclosure();
  const {setColorScheme, toggleColorScheme} = useMantineColorScheme();

  return (
    <AppShell
      navbar={{width: 200, breakpoint: 'sm', collapsed: {mobile: !opened}}}
      padding="sm"
    >
      <AppShell.Navbar p="md">
        <Logo />
        <DashboardMainMenu />
      </AppShell.Navbar>
      <AppShell.Main>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Group justify="space-between" w="100%">
          <Breadcrumbs separator={<RiArrowRightLine />}>
            {matches
              .filter(
                (match: UIMatch | any) =>
                  match.handle && match.handle.breadcrumb,
              )
              .map((match: UIMatch | any, index) => (
                <Anchor key={index} component={Link} to={match.pathname}>
                  {match.handle.breadcrumb(match)}
                </Anchor>
              ))}
          </Breadcrumbs>
          <ActionIcon
            onClick={toggleColorScheme}
            variant="default"
            size="xl"
            aria-label="Toggle color scheme"
          >
            <Box darkHidden>
              <RiSunLine />
            </Box>
            <Box lightHidden>
              <RiMoonLine />
            </Box>
          </ActionIcon>
        </Group>
        <Box p="sm">{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
}
