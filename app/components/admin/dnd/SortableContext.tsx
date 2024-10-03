import {SortableContext, rectSortingStrategy} from '@dnd-kit/sortable';
import {useDroppable} from '@dnd-kit/core';
import SortableItem from './SortableItem';
import {Box, Button} from '@mantine/core';
import {nanoid} from 'nanoid';
import {useEditorContext} from './EditorContext';
import {useListState} from '@mantine/hooks';
import {useEffect} from 'react';

export default function DndSortableContext() {
  const {sections, handlers, sortContainerId}: any = useEditorContext();

  const {setNodeRef} = useDroppable({id: sortContainerId});

  const addSection = () => {
    handlers.prepend({id: nanoid(), type: 'section', data: {}});
  };

  return (
    <SortableContext items={sections} strategy={rectSortingStrategy}>
      <Button onClick={addSection} variant="filled">
        Button
      </Button>
      <Box w={'100%'} mih={'500px'} ref={setNodeRef}>
        {sections &&
          sections?.map(({id, type, data}: any) => {
            return (
              <Box key={id}>
                <SortableItem id={id} type={type} data={data} />
              </Box>
            );
          })}
      </Box>
    </SortableContext>
  );
}
