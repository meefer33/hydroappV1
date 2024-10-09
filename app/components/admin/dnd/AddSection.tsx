import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Group,
  HoverCard,
  Popover,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { useEditorContext } from './EditorContext';
import { nanoid } from 'nanoid';

export const sectionProps = {
  padding: {
    top: 'sm',
    bottom: 'sm',
  },
  bgColor: 'primary',
};

export default function AddSection({props}: any) {
    const {sections, handlers, sortContainerId}: any = useEditorContext();

    const addSection = (type:any) => {
        handlers.append({id: nanoid(), type: type, data: {}});
      };
      
  return (

      <Popover 
        //width={600}
        position="bottom"
        radius="md"
        shadow="md"
        withinPortal
      >
        <Popover.Target>
          <Button variant="filled">Add Section</Button>
        </Popover.Target>

        <Popover.Dropdown style={{overflow: 'hidden'}}>
          <Group justify="space-between" px="md">
            <Text fw={500}>Features</Text>
            <Anchor href="#" fz="xs">
              View all
            </Anchor>
          </Group>

          <Divider my="sm" />

          <SimpleGrid cols={2} spacing={0}>
            
          </SimpleGrid>

          <div >
         
              <div>
              <Group justify="space-between">
                <Text fw={500} fz="sm">
                  Section
                </Text>
                <Text size="xs" c="dimmed">
                </Text>
                <Button variant="default" onClick={()=>addSection('section')}>Add</Button>
                </Group>
              </div>
              <div>
              <Group justify="space-between">
                <Text fw={500} fz="sm">
                  Grid Section
                </Text>
                <Text size="xs" c="dimmed">
                </Text>
                <Button variant="default" onClick={()=>addSection('sectionGrid')}>Add</Button>
                </Group>
              </div>
              
            
          </div>
        </Popover.Dropdown>
      </Popover>
 
  );
}
