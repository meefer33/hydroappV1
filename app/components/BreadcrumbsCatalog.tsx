import { Anchor, Breadcrumbs } from '@mantine/core';
import {Link, useLocation, useMatch, useMatches} from '@remix-run/react';

export default function BreadcrumbsCatalog({catalogMenu}: any) {
  //const matches = useMatch();
  const location = useLocation();
  const paths = location.pathname.replace('/catalog/', '').split('/');
  let items = catalogMenu;
  let bc = '/collections';

  const getBreadcrumb = (path: any) => {
   return items.map((item: any) => {
      const url = new URL(item.url).pathname;
      const breadcrumbPath = url.split('/');

      if (breadcrumbPath[2] === path) {
        items = item.items;
        bc = `${bc}/${breadcrumbPath[2]}`;
        return <Anchor component={Link} key={path} to={bc} underline="never" fz="xs">{item.title}</Anchor>;
      }
    });
  };

  return (
    <Breadcrumbs separator=">" separatorMargin="sm"  >
      {paths.map((path) => {
        if (path !== 'all') {
          return getBreadcrumb(path);
        }
      })}
    </Breadcrumbs>
  );
}
