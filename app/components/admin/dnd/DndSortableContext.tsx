import {SortableContext, rectSortingStrategy} from '@dnd-kit/sortable';
import {useDndContext, useDroppable} from '@dnd-kit/core';
import SortableItem from './SortableItem';
import {ActionIcon, Box, Button, Group, Modal, SimpleGrid} from '@mantine/core';
import {nanoid} from 'nanoid';
import {useEditorContext} from './EditorContext';
import {useDisclosure, useListState} from '@mantine/hooks';
import {useEffect} from 'react';
import SelectOverlay from './SelectOverlay';
import AddSection from './AddSection';
import { RiAddBoxLine } from '@remixicon/react';

export default function DndSortableContext() {
  const [opened, {open, close}] = useDisclosure(false);
  const {sections, handlers, sortContainerId}: any = useEditorContext();
  //const dndContext = useDndContext();
  //console.log('dndContext',dndContext)
  const {setNodeRef} = useDroppable({id: sortContainerId});

  const addSection = (type:any) => {
    handlers.prepend({id: nanoid(), type: type, data: {}});
    close()
  };

  return (
    <>
      <SortableContext items={sections} strategy={rectSortingStrategy}>
        <Box w={'100%'} ref={setNodeRef}>
          {sections &&
            sections?.map(({id, type, data}: any, i: any) => {
              return (
                <SortableItem
                  key={id}
                  id={id}
                  type={type}
                  data={data}
                  index={i}
                  open={open}
                />
              );
            })}
        </Box>
      </SortableContext>
      <Modal opened={opened} onClose={close} title="Add Section" zIndex="999">
        <SimpleGrid cols={2} spacing={0}></SimpleGrid>

        <div>
          <div>
            <Group justify="space-between">
              <Box>Grid</Box>
              <ActionIcon
                variant="filled"
                radius="xs"
                aria-label="Settings"
              >
                <RiAddBoxLine size={20} onClick={() => addSection('grid')} />
              </ActionIcon>
            </Group>
          </div>
          <div></div>
        </div>
      </Modal>
    </>
  );
}
