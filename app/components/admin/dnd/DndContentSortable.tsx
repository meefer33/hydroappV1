import {SortableContext, rectSortingStrategy} from '@dnd-kit/sortable';
import {useDroppable} from '@dnd-kit/core';
import DndContentSortableItem from './DndContentSortableItem';
import {Box} from '@mantine/core';
import {nanoid} from 'nanoid';

export default function DndContentSortable({sections, handlers}: any) {
  const {setNodeRef} = useDroppable({id: nanoid()});

  return (
    <SortableContext items={sections} strategy={rectSortingStrategy}>
      <Box w={'100%'} ref={setNodeRef}>
        {sections?.map((item: any, i: any) => {
          return (
            <DndContentSortableItem
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
  );
}
