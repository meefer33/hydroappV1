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
import useThemeUtils from './useEditorUtils';
import {useState} from 'react';
import DndOutline from './DndOutline';
import ButtonAddSection from './ButtonAddSection';

export default function DndOutlineSortableItem({id, type, data}: any) {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({id});
  const {item, setItem, selectedItem, setSelectedItem}: any =
    useOutletContext();
  const {deleteEditorContent} = useThemeUtils();
  const [hoveredItem, setHoveredItem] = useState(false);
  return (
    <Box
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        // border: hovered ? '1px solid blue' : '',
        opacity: isDragging ? 0 : 1,
        height: isDragging ? '50px' : 'auto',
        //border: selectedItem === id ? '2px solid blue' : '',
      }}
      bg={hoveredItem ? 'gray.2' : 'gray.0'}
      bd={selectedItem === id ? '2px solid blue.3' : '2px dashed gray.5'}
      p={3}
      mb={6}
    >
      <Group
        pl={4}
        justify="space-between"
        align="center"
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
          <Group gap="0" align="center">
            <Button
              {...attributes}
              {...listeners}
              aria-label="Move"
              color="green"
              variant="transparent"
              size="sm"
              p="0"
            >
              {hoveredItem ? <RiDraggable size="20" /> : <Box m="2"></Box>}
            </Button>

            <Text size="xs">
              {type
                ?.replaceAll('_', ' ')
                .replaceAll(/(^\w|\s\w)/g, (firstCharOfWord) =>
                  firstCharOfWord.toUpperCase(),
                )}
            </Text>
          </Group>
        </Box>

        <Group gap="0" align="center">
          <Button
            variant="transparent"
            color="red"
            size="xs"
            onClick={() => {
              deleteEditorContent(data.id);
            }}
          >
            {hoveredItem ? <RiDeleteBinLine size="16" /> : ''}
          </Button>
        </Group>
      </Group>
      {data.type === 'section_blocks' && (
        <Box ml={5}>
          <DndOutline
            content={data?.fields?.blocks}
            id={data?.id}
            updateKey="blocks"
          />
          <ButtonAddSection data={data} />
        </Box>
      )}
      {data.type === 'blocks' && (
        <Box ml={5}>
          <DndOutline
            content={data?.fields?.block_items}
            id={data?.id}
            updateKey="block_items"
          />
          <ButtonAddSection data={data} />
        </Box>
      )}
    </Box>
  );
}
