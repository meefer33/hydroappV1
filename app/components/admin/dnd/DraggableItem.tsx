import {useDraggable} from '@dnd-kit/core';
import {Box, Container} from '@mantine/core';
import {nanoid} from 'nanoid';
import {useEffect} from 'react';

export default function DraggableItem({label,id,data}: any) {
  //const id = nanoid()
  console.log('nanoid',id)
const {attributes, listeners, setNodeRef} = useDraggable({
  id,data
});
//console.log('draggableitem',data,id)
const style = {
  color: 'white',
  border: '1px dashed black',
};

  // this is the list of components/sections to be dragged must be in a droppable container
  return (
    <Box
      h={50}
      bg="gray.3"
      p="sm"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {label}
    </Box>
  );
}
