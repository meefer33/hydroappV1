import {
  ActionIcon,
  Box,
  Button,
  Container,
  Overlay,
  Stack,
} from '@mantine/core';
import {useHover} from '@mantine/hooks';
import {useEditorContext} from './EditorContext';
import {RiAddCircleFill, RiDragDropFill, RiDragMoveLine} from '@remixicon/react';

export default function SelectOverlay({
  attributes,
  listeners,
  id,
  data,
  isDragging,
  children,
}: any) {
  const {setSelectedItem, setItem}: any = useEditorContext();
  const {hovered, ref} = useHover();
  return (
    <Box ref={ref} pos="relative">
      {hovered  && (
        <>
          <Box
            pos="absolute"
            //w={100}
            // h={50}
            //bg="#000"
            //opacity={0.5}
            top="0"
            bottom="0"
            right="0"
            left="0"
            style={{
              border: '2px solid gray.7',
            }}
            onClick={() => {
              console.log('clicked', id, data);
              setSelectedItem(id);
              setItem(data);
            }}
          />

          <Container fluid>
            <Box pos="absolute" top="-15px" left="50%">
          
              <ActionIcon.Group>
                <ActionIcon
                  bg="gray.7"
                  variant="filled"
                  radius="xl"
                  aria-label="Settings"
                >
                  <RiAddCircleFill size={20} />
                </ActionIcon>
                <ActionIcon
                  {...attributes}
                  {...listeners}
                  bg="gray.7"
                  variant="filled"
                  radius="xl"
                  aria-label="Settings"
                >
                  <RiDragMoveLine size={20} />
                </ActionIcon>
              </ActionIcon.Group>
         
            </Box>
      
          </Container>
        </>
      )}
      {children}
    </Box>
  );
}
