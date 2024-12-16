import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {ActionIcon, Box, Container, Text} from '@mantine/core';
import {RiAddLine, RiDeleteBinLine, RiDraggable} from '@remixicon/react';
import {useOutletContext} from '@remix-run/react';
import useThemeUtils from './useEditorUtils';
import BlockImage from './theme/sections/BlockImage';
import BlockRichText from './theme/sections/BlockRichText';
import SectionCollectionDisplay from './theme/sections/SectionCollectionDisplay';
import SectionBlocks from './theme/sections/SectionBlocks';
import DndContent from './DndContent';
import {useElementSize, useHover} from '@mantine/hooks';
import Headers from './theme/sections/Headers';
import Blocks from './theme/sections/Blocks';

export default function DndContentSortableItem({id, type, data}: any) {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({id});
  const {
    item,
    setItem,
    selectedItem,
    setSelectedItem,
    openModal,
    setMetaData,
    theme,
  }: any = useOutletContext();
  const {deleteMetaobject} = useThemeUtils();
  const {hovered, ref} = useHover();
  const {ref: refel, width, height} = useElementSize();

  const hasInnerContent = (type: any) => {
    switch (type) {
      case 'content':
      case 'grids':
      case 'section_blocks':
      case 'blocks':
        return true;
      default:
        return false;
    }
  };
  const getType = (item: any) => {
    switch (item.type) {
      case 'headers':
        return <Headers settings={item?.fields?.settings} theme={theme} />;
      case 'section_blocks':
        //does not use the <SectionBlocks> theme component due to embedded editor controls
        return (
          <Container fluid px={0} py={item?.fields?.settings?.padding} bg={item?.fields?.settings?.bg}>
            <Container size={item?.fields?.settings?.contentWidth}>
              <DndContent
                content={item?.fields?.blocks}
                id={item?.id}
                updateKey="blocks"
                type="simplegrid"
                zones={item?.fields?.settings}
              />
            </Container>
          </Container>
        );
      case 'blocks':
        return (
          <Blocks settings={item?.fields?.settings}>
            <DndContent
              content={item?.fields?.block_items}
              id={item?.id}
              updateKey="block_items"
            />
          </Blocks>
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

  return (
    <Box
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      bd={selectedItem === id ? '2px solid gray.7' : '0px'}
      pos="relative"
    >
      <Box pos="relative" ref={refel} bd={hovered ? '1px solid gray.7' : '0px'}>
        <Box
          pos="absolute"
          top={-20}
          left={0}
          h={height}
          w={width}
          ref={ref}
          style={{
            zIndex: 998,
          }}
        >
          <Box
            pos="absolute"
            top={0}
            left={20}
            style={{
              zIndex: 999,
            }}
          >
            {hovered && (
              <ActionIcon.Group>
                <ActionIcon
                  color="gray.7"
                  size="lg"
                  aria-label="Gallery"
                  {...attributes}
                  {...listeners}
                >
                  <RiDraggable size="24" />
                </ActionIcon>
                <ActionIcon
                  color="gray.7"
                  w="auto"
                  size="lg"
                  aria-label="Settings"
                  onClick={() => {
                    setItem(data);
                    setSelectedItem(id);
                  }}
                >
                  <Text size="md">
                    {type
                      .replaceAll('_', ' ')
                      .replaceAll(/(^\w|\s\w)/g, (firstCharOfWord) =>
                        firstCharOfWord.toUpperCase(),
                      )}
                  </Text>
                </ActionIcon>
                {hasInnerContent(data.type) && (
                  <ActionIcon
                    color="gray.7"
                    size="lg"
                    aria-label="Settings"
                    onClick={() => {
                      openModal();
                      setMetaData(data);
                    }}
                  >
                    <RiAddLine size="18" />
                  </ActionIcon>
                )}
                <ActionIcon
                  color="gray.7"
                  size="lg"
                  aria-label="Likes"
                  onClick={() => {
                    deleteMetaobject(data.id);
                  }}
                >
                  <RiDeleteBinLine size="18" />
                </ActionIcon>
              </ActionIcon.Group>
            )}
          </Box>
        </Box>
        {getType(data)}
      </Box>
    </Box>
  );
}
