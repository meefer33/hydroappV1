import {SortableContext, rectSortingStrategy} from '@dnd-kit/sortable';
import {useDroppable} from '@dnd-kit/core';
import SortableItem from './SortableItem';
import {Box} from '@mantine/core';
import {nanoid} from 'nanoid';

export default function DndSortableContext({
  sections,
  handlers,
}: any) {
  const {setNodeRef} = useDroppable({id: nanoid()});

  const addSection = (type: any) => {
    handlers.prepend({id: nanoid(), type: type, data: {}});
    close();
  };

  return (
    <>
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
    </>
  );
}
