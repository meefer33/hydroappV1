import {SortableContext, rectSortingStrategy} from '@dnd-kit/sortable';
import {useDndContext, useDroppable} from '@dnd-kit/core';
import SortableItem from './SortableItem';
import {Box, Button} from '@mantine/core';
import {nanoid} from 'nanoid';
import {useEditorContext} from './EditorContext';
import {useListState} from '@mantine/hooks';
import {useEffect} from 'react';
import SelectOverlay from './SelectOverlay';
import AddSection from './AddSection';

export default function DndSortableContext() {
  const {sections, handlers, sortContainerId}: any = useEditorContext();
  //const dndContext = useDndContext();
 //console.log('dndContext',dndContext)
  const {setNodeRef} = useDroppable({id: sortContainerId});

  const addSection = () => {
    handlers.prepend({id: nanoid(), type: 'section', data: {}});
  };

  return (
    <SortableContext items={sections} strategy={rectSortingStrategy}>
      <Box w={'100%'} ref={setNodeRef}>
        {sections &&
          sections?.map(({id, type, data}:any,i:any) => {
            return <SortableItem key={id} id={id} type={type} data={data} index={i} />;
          })}
      </Box>
      <AddSection/>
    </SortableContext>
  );
}
