import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  Select,
  Table,
  TextInput,
} from '@mantine/core';
import dayjs from 'dayjs/esm/index.js';
import {Form, Link, useActionData, useLoaderData} from '@remix-run/react';
import {RiExternalLinkLine} from '@remixicon/react';
import {ActionFunctionArgs, LoaderFunctionArgs} from '@remix-run/node';

import {parseCmsContent, parseContent} from '~/lib/parseContent';
import {GetMetaobject} from '~/graphql/admin/GetMetaobject';
import {CreateMetaobject} from '~/graphql/admin/CreateMetaobject';
import {GetMetafieldsDefinitions} from '~/graphql/admin/GetMetafieldsDefinitions';
import {GetMenus} from '~/graphql/admin/GetMenus';
import CatalogMenu from '~/components/CatalogMenu';

export const loader = async ({context}: LoaderFunctionArgs) => {
  const {admin} = context;

  //check if catalog exists if not create it
  const getMenus = await admin.request(GetMenus);
  //const catalog = getMetafieldsDefinitions?.data?.menus?.nodes;
  const catalog = getMenus?.data?.menus?.nodes.filter(
    (menu: any) => menu.handle === 'catalog',
  );

  return {catalog};
};

export default function Catalog() {
  const data: any = useLoaderData<typeof loader>();
  console.log(data?.catalog);
  const catalogMenu = data?.catalog[0];
  return (
    <>
      <div>
        Product Metafield catalog(smart collection metafield) - list of choices
        is every category it is in -- solar power | battery | 3.2v - catalog
        menu represents the filtering of these items -- smart collections are
        linked to the menus
      </div>
      <Menu menuItems={catalogMenu?.items} variant="separated" />
    </>
  );
}

function Menu({menuItems, variant = 'filled', parent="/admin/catalog"}: any) {
  return (
    <Accordion variant={variant} chevronPosition="left">
      {menuItems.map((item: any) => {
        return <MenuList key={item.id} menu={item} parent={parent} />;
      })}
    </Accordion>
  );
}

function MenuList({menu,parent}: any) {
  const handle = menu.url.split('/')[2];
  console.log(handle);
  return (
    <Accordion.Item key={menu.id} value={menu.title}>
      <Center>
        <Accordion.Control>{menu.title}</Accordion.Control>
        <ActionIcon size="lg" variant="subtle" color="gray">
          <ActionIcon component={Link} to={`${parent}/${handle}`} size="sm">
            <RiExternalLinkLine />
          </ActionIcon>
        </ActionIcon>
      </Center>
      <Accordion.Panel 
        styles={{
          content: {
            paddingRight:0
          }
        }}
      >
        {menu?.items && <Menu menuItems={menu.items} parent={`${parent}/${handle}`} />}
      </Accordion.Panel>
    </Accordion.Item>
  );
}

