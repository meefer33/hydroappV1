import {Link, NavLink, useRouteLoaderData} from '@remix-run/react';
import {RiDashboard2Line, RiLayoutFill, RiListView} from '@remixicon/react';
import {Box, NavLink as Mnav} from '@mantine/core';
import {RootLoader} from '~/root';

export default function CatalogMenu({catalogMenu,breadcrumb}: any) {
  //const root: any = useRouteLoaderData<RootLoader>('root');
  // const catalogMenu = root?.header?.catalog?.items;
  return (
    <Box visibleFrom='sm'>
      {catalogMenu.map((item: any) => {
        const url = new URL(item.url).pathname;
        const path = url.split('/');
        
        if (item?.items?.length) {
          return (
            <Mnav
              key={item.id}
              component={NavLink}
              to={path[2]}
              label={item.title}
              //leftSection={<RiDashboard2Line size="1rem" />}
              variant="subtle"
              childrenOffset={10}
            >
              <Mnav
                key={item.id}
                component={NavLink}
                to={`/${breadcrumb}/${path[2]}`}
                label="View All"
                //leftSection={<RiDashboard2Line size="1rem" />}
                variant="subtle"
                autoContrast
              />
              <CatalogMenu catalogMenu={item.items} breadcrumb={`${breadcrumb}/${path[2]}`}/>
            </Mnav>
          );
        } else {
          return (
            <Mnav
              key={item.id}
              component={NavLink}
              to={`/${breadcrumb}/${path[2]}`}
              label={item.title}
              //leftSection={<RiDashboard2Line size="1rem" />}
              variant="subtle"
              state={item.title}
            />
          );
        }
      })}
    </Box>
  );
}
