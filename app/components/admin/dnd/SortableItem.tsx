import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {ActionIcon, Box, Button, Container, Overlay} from '@mantine/core';
import Section from './components/Section';
import {useForceUpdate, useHover} from '@mantine/hooks';
import {useContext, useState} from 'react';
import {useEditorContext} from './EditorContext';
import {RiAddCircleFill, RiDeleteBack2Line, RiDragMoveLine, RiPencilFill} from '@remixicon/react';

export default function SortableItem({id, type, data,index}: any) {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({id});
  const {hovered, ref} = useHover();
  const {setSelectedItem, setItem, handlers}: any = useEditorContext();

  const getType = (type: any, data: any) => {
    switch (type) {
      case 'section':
        return <Section props={data} />;
      default:
        return null;
    }
  };

  return (
    <Box ref={ref} pos="relative">
      {hovered && <Overlay color="#a5d8ff" backgroundOpacity={0.6} />}
      {hovered && (
        <Box pos="absolute" top="0px" left="45%" style={{zIndex: 999}}>
          <ActionIcon.Group>
            <ActionIcon
              bg="gray.7"
              variant="filled"
              radius="md"
              aria-label="Add Section"
              size="md"
              onClick={() => {
                console.log('clicked', id, data);
                setSelectedItem(id);
                setItem(data);
              }}
            >
              <RiAddCircleFill size={20} />
            </ActionIcon>
            <ActionIcon
              bg="gray.7"
              variant="filled"
              radius="md"
              aria-label="Edit"
              size="md"
              onClick={() => {
                console.log('clicked', id, data);
                setSelectedItem(id);
                setItem(data);
              }}
            >
              <RiPencilFill size={20} />
            </ActionIcon>
            <ActionIcon
              bg="gray.7"
              variant="filled"
              radius="md"
              aria-label="Remove"
              size="md"
              onClick={() => {
                console.log('clicked', index);
                handlers.remove(index, 1)
              }}
            >
              <RiDeleteBack2Line size={20} />
            </ActionIcon>
            <ActionIcon
              {...attributes}
              {...listeners}
              bg="gray.7"
              variant="filled"
              radius="md"
              aria-label="Move"
              size="md"
            >
              <RiDragMoveLine size={20} />
            </ActionIcon>
          </ActionIcon.Group>
        </Box>
      )}
      <Box
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
          // border: hovered ? '1px solid blue' : '',
          opacity: isDragging ? 0.5 : 1,
        }}
        onClick={() => {
          console.log('clicked', id, data);
          setSelectedItem(id);
          setItem(data);
        }}
      >
        {getType(type, data)}
      </Box>
    </Box>
  );
}
