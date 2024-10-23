import {SortableContext, rectSortingStrategy} from '@dnd-kit/sortable';
import {useDroppable} from '@dnd-kit/core';
import SortableItem from './SortableItem';
import {Box} from '@mantine/core';
import {nanoid} from 'nanoid';
import { useOutletContext } from '@remix-run/react';
import { useState } from 'react';

export default function DndSortableContext({
  sections,
  handlers
}: any) {
  const {setNodeRef} = useDroppable({id: nanoid()});

  return (
    <Box>
      <SortableContext items={sections} strategy={rectSortingStrategy}>
        <Box w={'100%'} ref={setNodeRef}>
          {sections?.map((item: any, i: any) => {
            return (
              <SortableItem
                key={item.id}
                id={item.id}
                type={item.type}
                data={item}
                index={i}
                open={open}
              />
            );
          })}
        </Box>
      </SortableContext>
    </Box>
  );
}
