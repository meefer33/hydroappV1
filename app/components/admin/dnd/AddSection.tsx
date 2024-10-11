import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Group,
  HoverCard,
  Modal,
  Popover,
  SimpleGrid,
  Text,
} from '@mantine/core';
import {useEditorContext} from './EditorContext';
import {nanoid} from 'nanoid';
import {RiAddCircleFill} from '@remixicon/react';
import {useDisclosure} from '@mantine/hooks';

export const sectionProps = {
  padding: {
    top: 'sm',
    bottom: 'sm',
  },
  bgColor: 'primary',
};

export default function AddSection({props}: any) {
  const {sections, handlers, sortContainerId}: any = useEditorContext();
  const [opened, {open, close}] = useDisclosure(false);

  const addSection = (type: any) => {
    handlers.append({id: nanoid(), type: type, data: {}});
  };

  return (
    <>
      <ActionIcon
        bg="gray.7"
        variant="filled"
        radius="md"
        aria-label="Add Section"
        size="md"
      >
        <RiAddCircleFill size={20} onClick={() => open()} />
      </ActionIcon>
    </>
  );
}
