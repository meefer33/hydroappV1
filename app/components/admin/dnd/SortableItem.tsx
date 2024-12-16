import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {
  Accordion,
  ActionIcon,
  Box,
  Button,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import {
  RiDeleteBinLine,
  RiDraggable,
  RiExpandUpDownFill,
  RiMenLine,
} from '@remixicon/react';
import {useOutletContext} from '@remix-run/react';
import DndMeta from './DndMeta';
import ButtonAddSection from './ButtonAddSection';
import useThemeUtils from './useEditorUtils';
import {useHover} from '@mantine/hooks';
import {useState} from 'react';

export default function SortableItem({id, type, data}: any) {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({id});
  const {item, setItem, selectedItem, setSelectedItem}: any =
    useOutletContext();
  const {deleteMetaobject} = useThemeUtils();
  //const {hovered, ref} = useHover();
  const [hoveredItem, setHoveredItem] = useState(false);
  return (
    <Box
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        // border: hovered ? '1px solid blue' : '',
        opacity: isDragging ? 0.5 : 1,
        //border: selectedItem === id ? '2px solid blue' : '',
      }}
      bg={hoveredItem ? 'gray.2' : 'gray.0'}
      bd={selectedItem === id ? '2px solid blue.3' : '2px dashed gray.5'}
      p={6}
      mb={12}
    >
      <Group
        pl={4}
        justify="space-between"
        //={{backgroundColor: hoveredItem ? 'blue' : '',}}
        onMouseOver={(e) => {
          e.stopPropagation();
          setHoveredItem(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setHoveredItem(false);
        }}
      >
        <Box
          onClick={() => {
            setItem(data);
            setSelectedItem(id);
          }}
        >
          <Group gap="2">
          {hoveredItem ? 
            <Box {...attributes} {...listeners} aria-label="Move" size="lg">
              <RiDraggable size="16" />
            </Box>
            : ''}
            <Text size="sm">{type}</Text>
          </Group>
        </Box>

        <Group gap="2">
          <Button
            variant="transparent"
            color="negative"
            size="xs"
            onClick={() => {
              deleteMetaobject(data.id);
            }}
          >
            <RiDeleteBinLine size="16" />
          </Button>
        </Group>
      </Group>
      {data.type === 'section_blocks' || data.type === 'blocks' ? (
        <Box ml={10}>
          <DndMeta
            content={
              data.type === 'blocks'
                ? data?.fields?.block_items
                : data?.fields?.blocks
            }
            id={data?.id}
            updateKey="blocks"
          />
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
}
