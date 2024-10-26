import {useDroppable} from '@dnd-kit/core';
import {Box} from '@mantine/core';
import {nanoid} from 'nanoid';

export default function DropZone({children,}:any) {
  const {setNodeRef, isOver} = useDroppable({id: nanoid()});
  return <Box ref={setNodeRef}>{children}</Box>;
}
