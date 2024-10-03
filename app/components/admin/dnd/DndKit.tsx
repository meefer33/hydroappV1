import {useContext, useState} from 'react';
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
import { useEditorContext } from './EditorContext';

export interface ItemType {
  id: UniqueIdentifier;
  color: string;
}

export default function DndKit({children}: any) {
  const {sections, handlers, setActiveItem, activeItem}:any =
  useEditorContext();

  const handleDragEnd = ({active, over}: DragEndEvent) => {
    console.log('dragend', active.id, sections);
    setActiveItem(null);
  };

  const onDragOver = ({active, over}: DragOverEvent) => {
    console.log('dragover', active.id);
    const active_indx = sections.findIndex((x: any) => x.id === active.id);
    const over_indx = sections.findIndex((x: any) => x.id === over?.id);
    console.log('dragover-1', active_indx, over_indx);
    if (active_indx !== -1 && over_indx !== -1) {
      if (active_indx === over_indx) return;
      handlers.reorder({from: active_indx, to: over_indx});
    }
  };

  return (
    <DndContext
      onDragStart={({active}) => {
        console.log('active', active);
        //if (active.id === favoriteId) setActiveItemOrigin('favorite');
        setActiveItem(active?.data);
      }}
      onDragOver={onDragOver}
      onDragCancel={() => {
        setActiveItem(null);
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
