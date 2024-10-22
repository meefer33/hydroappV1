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
import useThemeUtils from './useEditorUtils';

export default function SortableItem({id, type, data}: any) {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({id});
  const {item,setItem,selectedItem, setSelectedItem}: any = useOutletContext();
  const {deleteEditorContent} = useThemeUtils();
console.log('setSelectedItem',selectedItem,id)
  return (
    <>
      <Box
        bg="gray.0"
       //bd={`${selectedItem === id ? '2px solid blue.3':''}`}
        p={2}
        m={10}
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
          // border: hovered ? '1px solid blue' : '',
          opacity: isDragging ? 0.5 : 1,
          border: selectedItem === id ? '2px solid blue' : ''
        }}
      >
        <Group justify="space-between">
          <Stack gap="0">
            <Box>
              <Button
                //fullWidth
                size="xs"
                variant="filled"
                color="blue.3"
                radius="0"
                onClick={() => {
                  console.log('clicked', id, data);
                  setItem(data);
                  setSelectedItem(id)
                }}
              >
                {type}{' '}
              </Button>
            </Box>
            <Box>
              <Text size="xs">
                {data?.fields?.settings?.name || data?.handle}
              </Text>
            </Box>
          </Stack>

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
              content: {padding: '4px'},
            }}
            multiple 
            defaultValue={[selectedItem]}
          >
            <Accordion.Item key={id} value={id}>
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
