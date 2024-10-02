import {Outlet, useRouteLoaderData, Link, NavLink} from '@remix-run/react';
import {RootLoader} from '~/root';
import {RiDashboard2Line, RiLayoutFill, RiListView} from '@remixicon/react';
import {Box, Container, Grid, Group, NavLink as Mnav} from '@mantine/core';
import CatalogMenu from '~/components/CatalogMenu';
import BreadcrumbsCatalog from '~/components/BreadcrumbsCatalog';

export default function Collections() {
  const root: any = useRouteLoaderData<RootLoader>('root');
  const catalogMenu = root?.header?.catalog?.items;
  console.log('root', root);
  return (
    <Container fluid pt="md">
      <Grid>
        <Grid.Col span={{base: 12, md: 'content'}}>
          <CatalogMenu catalogMenu={catalogMenu} breadcrumb="collections" />
        </Grid.Col>
        <Grid.Col span={{base: 12, md: 'auto'}}>
          <Container size="xl">
            <BreadcrumbsCatalog catalogMenu={catalogMenu} />
            <Outlet />
          </Container>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
