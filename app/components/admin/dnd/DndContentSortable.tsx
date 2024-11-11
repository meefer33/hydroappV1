import {
  SortableContext,
  rectSortingStrategy,
  rectSwappingStrategy,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import DropZone from './DropZone';
import {SimpleGrid} from '@mantine/core';
import DndContentSortableItem from './DndContentSortableItem';

export default function DndContentSortable({
  sections,
  type,
  zones,
  loadData,
}: any) {
  //console.log('blank', type, loadData, sections);
  const displayType = (type: any) => {
    switch (type) {
      case 'single':
        return (
          <DropZone>
            {sections?.map((item: any, i: any) => {
              return (
                <DndContentSortableItem
                  key={item.id}
                  id={item.id}
                  type={item.type}
                  data={item}
                />
              );
            })}
          </DropZone>
        );
      case 'simplegrid':
        return (
          <DropZone>
            <SimpleGrid
              type="container"
              cols={{
                base: zones?.cols?.mobile,
                '36em': zones?.cols?.tablet,
                '48em': zones?.cols?.desktop,
              }}
              spacing={zones?.spacing}
              //verticalSpacing={settings?.spacing}
            >
              {sections?.map((item: any, i: any) => {
                return (
                  <DndContentSortableItem
                    key={item.id}
                    id={item.id}
                    type={item.type}
                    data={item}
                  />
                );
              })}
            </SimpleGrid>
          </DropZone>
        );
      case 'collection':
        loadData.type = "collection"
        return (
          <DropZone>
            <DndContentSortableItem
              key={loadData.collection.id}
              id={loadData.collection.id}
              type="collection"
              data={loadData}
            />
          </DropZone>
        );
      default:
        return <></>;
    }
  };

  return (
    <SortableContext
      items={sections}
      strategy={
        type === 'simplegrid'
          ? horizontalListSortingStrategy
          : verticalListSortingStrategy
      }
    >
      {displayType(type)}
    </SortableContext>
  );
}
