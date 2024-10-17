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
import {RiDeleteBinLine, RiExpandUpDownFill} from '@remixicon/react';
import {useOutletContext} from '@remix-run/react';
import DndMeta from './DndMeta';
import ButtonAddSection from './ButtonAddSection';
import useThemeUtils from './theme/useThemeUtils';

export default function SortableItem({id, type, data}: any) {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({id});
  const {setItem}: any = useOutletContext();
  const {deleteEditorContent} = useThemeUtils();

  return (
    <>
      <Box
        bg="gray.0"
        p={4}
        m={6}
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
          // border: hovered ? '1px solid blue' : '',
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        <Group justify="space-between">
          <Box
            onClick={() => {
              console.log('clicked', id, data);
              setItem(data);
            }}
          >
            <Stack gap="xs">
              <Box>{type}</Box>
              <Box>
                <Text size="xs" c="gray.6">
                  {data?.fields?.settings?.name || data?.handle}
                </Text>
              </Box>
            </Stack>
          </Box>

          <Group gap="2">
            <Button
              variant="transparent"
              color="negative"
              size="xs"
              onClick={() => {
                deleteEditorContent(data.id);
              }}
            >
              <RiDeleteBinLine size="16" />
            </Button>
            <Box {...attributes} {...listeners} aria-label="Move" size="lg">
              <RiExpandUpDownFill size={20} />
            </Box>
          </Group>
        </Group>
        {data.type === 'section_blocks' || data.type === 'blocks' ? (
          <Accordion
            variant="filled"
            radius={0}
            chevronSize={30}
            styles={{
              content: {padding: '2px'},
            }}
          >
            <Accordion.Item key={id} value={data.type}>
              <Accordion.Control>{data.type}</Accordion.Control>
              <Accordion.Panel bg="gray.2">
                <DndMeta
                  content={
                    data.type === 'blocks'
                      ? data?.fields?.block_items
                      : data?.fields?.blocks
                  }
                  id={data?.id}
                  updateKey="blocks"
                />
                <ButtonAddSection data={data} />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        ) : (
          ''
        )}
      </Box>
    </>
  );
}
