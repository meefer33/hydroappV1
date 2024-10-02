import {useState} from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {rectIntersection} from '@dnd-kit/core';
import {arrayMove} from '@dnd-kit/sortable';
import {nanoid} from 'nanoid';
import {Box, Stack} from '@mantine/core';

export interface ItemType {
  id: UniqueIdentifier;
  color: string;
}

export default function DND({
  children,
  items,
  setItems,
  sortContainerId,
  activeItem, 
  setActiveItem,
  itemId,
  setItemId
}: any) {
  //const [activeItem, setActiveItem] = useState<ItemType | null>(null);
  const [activeItemOrigin, setActiveItemOrigin] = useState<string | null>(null);
  //const [itemId, setItemId] = useState<UniqueIdentifier>(nanoid());

  const handleDragEnd = ({active, over}: DragEndEvent) => {
    console.log('dragend',items);
    setActiveItem(null);
    setActiveItemOrigin(null);
  };

  const onDragOver = ({active, over}: DragOverEvent) => {
    console.log('dragover', active.id);
    if (!over) {
      if (activeItemOrigin === null) return;
      setItems(items?.filter((x: any) => x.id !== active.id));
      setItemId(active.id);
      return;
    }

    const active_indx = items.findIndex((x: any) => x.id === active.id);
    const over_indx = items.findIndex((x: any) => x.id === over.id);
    console.log('dragover-5', active_indx, over_indx);
    if (active_indx !== -1 && over_indx !== -1) {
      if (active_indx === over_indx) return;
      setItems(arrayMove(items, active_indx, over_indx));
    } else if (over.id === sortContainerId) {
      if (items.findIndex((x: any) => x.id === active.id) === -1) {
        setItems([...items, {id: itemId, data: activeItem}]);
        //setItemId(nanoid());
      }
    }
  };

  return (
    <DndContext
      onDragStart={({active}) => {
        console.log('active', active, active?.data?.current?.type);
        //if (active.id === favoriteId) setActiveItemOrigin('favorite');
        if (active?.data?.current?.type) {
          setActiveItemOrigin(active?.data?.current?.type);
        }
        setActiveItem(active?.data);
      }}
      onDragOver={onDragOver}
      onDragCancel={() => {
        setActiveItem(null);
        setActiveItemOrigin(null);
      }}
      onDragEnd={handleDragEnd}
      collisionDetection={rectIntersection}
    >
      {children}
      <DragOverlay>
        {activeItem ? <Box h={50} w={50} bg="green.2" /> : null}
      </DragOverlay>
    </DndContext>
  );
}
