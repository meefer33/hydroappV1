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
import DndMeta from './DndOutline';
import ButtonAddSection from './ButtonAddSection';
import useThemeUtils from './useEditorUtils';
import {useHover} from '@mantine/hooks';
import {useState} from 'react';
import BlockImage from './theme/sections/BlockImage';
import BlockRichText from './theme/sections/BlockRichText';
import SectionCollectionDisplay from './theme/sections/SectionCollectionDisplay';

import HoveredItem from './HoveredItem';
import SectionBlocks from './theme/sections/SectionBlocks';
import DndContent from './DndContent';

export default function DndContentSortableItem({id, type, data}: any) {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({id});
  const {item, setItem, selectedItem, setSelectedItem}: any =
    useOutletContext();
  const {deleteEditorContent} = useThemeUtils();
  //const {hovered, ref} = useHover();
  const [hoveredItem, setHoveredItem] = useState(false);

  const getType = (item: any) => {
    switch (item.type) {
      case 'section_blocks':
        return (
          <SectionBlocks content={item}>
          
            <DndContent
              content={item?.fields?.blocks}
              id={item?.id}
              updateKey="blocks"
            />
          </SectionBlocks>
        );
      case 'blocks':
        return (
          <Box bg={item?.fields?.settings?.bg} p="sm">
            <DndContent
              content={item?.fields?.block_items}
              id={item?.id}
              updateKey="blocks"
            />
          </Box>
        );
      case 'block_rich_text':
        return <BlockRichText key={item.id} content={item} />;
      case 'block_image':
        return <BlockImage key={item.id} content={item} />;
      case 'section_collection':
        return <SectionCollectionDisplay content={item} />;
      default:
        return <></>;
    }
  };

  const getTypeBlock = (block: any) => {
    switch (block.type) {
      case 'block_rich_text':
        return <BlockRichText key={block.id} content={block} />;
      case 'block_image':
        return <BlockImage key={block.id} content={block} />;
      default:
        return <></>;
    }
  };

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
            console.log('clicked', id, data);
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
              {hoveredItem ? <RiDraggable size="24" /> : <Box m="4"></Box>}
            </Button>

            <Text size="md">
              {type
                .replaceAll('_', ' ')
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
            {hoveredItem ? <RiDeleteBinLine size="18" /> : ''}
          </Button>
        </Group>
      </Group>
      {getType(data)}
    </Box>
  );
}
