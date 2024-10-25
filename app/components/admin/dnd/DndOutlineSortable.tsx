import {SortableContext, rectSortingStrategy} from '@dnd-kit/sortable';
import {useDroppable} from '@dnd-kit/core';
import DndOutlineSortableItem from './DndOutlineSortableItem';
import {Box} from '@mantine/core';
import {nanoid} from 'nanoid';

export default function DndOutlineSortable({sections, handlers}: any) {
  const {setNodeRef} = useDroppable({id: nanoid()});

  return (
    <Box>
      <SortableContext items={sections} strategy={rectSortingStrategy}>
        <Box w={'100%'} ref={setNodeRef}>
          {sections?.map((item: any, i: any) => {
            return (
              <DndOutlineSortableItem
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
