import {FC, ReactNode} from 'react';
import {useDroppable, UniqueIdentifier} from '@dnd-kit/core';
import { Box, Container } from '@mantine/core';

export default function DropZone({
  children,
  id,
}: {
  children: ReactNode;
  id: UniqueIdentifier;
}) {
  const {setNodeRef, isOver} = useDroppable({id});
//wrapper for draggableItem and sortableItem
  return (
    <Box ref={setNodeRef} w="100%" h={50} p="0" m="0" >
      {children}
    </Box>
  );
}
