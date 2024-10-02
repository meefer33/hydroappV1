import {Config} from '@measured/puck';
import {LoaderFunctionArgs} from '@remix-run/node';
import {MetaDescriptor, MetaFunction, useLoaderData} from '@remix-run/react';
import {richTextSection} from '~/components/admin/puck/sections/richTextSection';
import {section} from '~/components/admin/puck/sections/section';
import {parseContent} from '~/lib/parseContent';
import {GetMetaobjectByHandle} from '~/graphql/admin/GetMetaobjectByHandle';
import PuckLayout from '~/components/admin/puck/PuckLayout';
import {loadFonts, updateSettingsEditMode} from '~/lib/utils';
import {useDisclosure, useListState, useToggle} from '@mantine/hooks';
import {CSSProperties, useState} from 'react';
import {grid} from '~/components/admin/puck/sections/grid';
import {imageSection} from '~/components/admin/puck/sections/imageSection';
import {productScroll} from '~/components/admin/puck/sections/productScroll';
import {collectionGrid} from '~/components/admin/puck/sections/collectionGrid';
import {contentLayout} from '~/components/admin/puck/sections/contentLayout';
import PuckLayoutContent from '~/components/admin/puck/PuckLayoutContent';
import {
  AppShell,
  Box,
  Burger,
  Container,
  Group,
  rem,
  Stack,
  Text,
} from '@mantine/core';
import DND, {ItemType} from '~/components/admin/dnd/DND';
import DropZone from '~/components/admin/dnd/DropZone';
import DraggableItem from '~/components/admin/dnd/DraggableItem';
import {UniqueIdentifier} from '@dnd-kit/core/dist/types';
import {nanoid} from 'nanoid';
import DndSortableContext from '~/components/admin/dnd/SortableContext';
import {DragOverlay} from '@dnd-kit/core';

import DndKit from '~/components/admin/dnd/DndKit';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return loadFonts(
    data?.fields?.layout?.fields?.theme?.fields?.settings?.other?.fonts,
  ) satisfies MetaDescriptor[];
};

export const loader = async ({context, params}: LoaderFunctionArgs) => {
  const {admin} = context;
  const handle = params.handle;

  const getThemeContent = await admin.request(GetMetaobjectByHandle, {
    variables: {
      handle: {type: 'content', handle: handle},
    },
  });
  const themeContent = parseContent(getThemeContent?.data?.metaobjectByHandle);

  return themeContent;
};

export default function EditContent() {
  const data: any = useLoaderData<typeof loader>();
  const [opened, {toggle}] = useDisclosure();
  const [viewport, setViewport] = useState('100%');
  const settings = updateSettingsEditMode(
    data?.fields?.layout?.fields?.theme?.fields?.settings,
  );

  const sortContainerId = 'main';
  const [items, setItems] = useState<ItemType[]>([]);
  const [activeItem, setActiveItem] = useState<ItemType | null>(null);
  const [itemId, setItemId] = useState<UniqueIdentifier>(nanoid());
  //console.log('themeContent', data);
  const [sections, handlers] = useListState([]);

  return (
    <DndKit
      sortContainerId={sortContainerId}
      activeItem={activeItem}
      setActiveItem={setActiveItem}
      sections={sections}
      handlers={handlers}
    >
      <AppShell
        layout="alt"
        header={{height: 60}}
        footer={{height: 60}}
        navbar={{width: 300, breakpoint: 'sm', collapsed: {mobile: !opened}}}
        aside={{
          width: 300,
          breakpoint: 'md',
          collapsed: {desktop: false, mobile: true},
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
    
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />

          
        
        
        
        </AppShell.Navbar>
        <AppShell.Main>
          <DndSortableContext sections={sections} handlers={handlers} sortContainerId={sortContainerId} />
        </AppShell.Main>
        <AppShell.Aside p="md">Aside</AppShell.Aside>
        <AppShell.Footer p="md">Footer</AppShell.Footer>
      </AppShell>
    </DndKit>
  );
}

export const handle = {
  breadcrumb: () => <span>Layouts</span>,
};
