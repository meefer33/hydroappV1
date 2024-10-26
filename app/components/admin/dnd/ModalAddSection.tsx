import {
  ActionIcon,
  Box,
  Button,
  Group,
  Modal,
  Stack,
  Title,
} from '@mantine/core';
import {useOutletContext} from '@remix-run/react';
import {RiAddBoxLine} from '@remixicon/react';
import useThemeUtils from './useEditorUtils';

export default function ModalAddSection() {
  const {modalIsOpen, closeModal, metaData}: any = useOutletContext();

  // console.log(editorContent);
  const getType = () => {
    if (metaData?.type) {
      switch (metaData?.type) {
        case 'content':
          return <AddSection />;
        case 'section_blocks':
          return <AddSectionBlocks />;
        case 'blocks':
          return <AddBlockItems />;
        default:
          return <></>;
      }
    }
  };
  return (
    <Modal
      opened={modalIsOpen}
      onClose={closeModal}
      //title={contentType}
      centered
    >
      {getType()}
    </Modal>
  );
}

const AddSection = () => {
  const {addEditorContent} = useThemeUtils();
  return (
    <Stack>
      <Box>
        <Group justify="space-between">
          <Title order={5}>Section Blocks</Title>
          <ActionIcon
            variant="transparent"
            onClick={() => addEditorContent('section_blocks', 'content')}
          >
            <RiAddBoxLine size="24" />
          </ActionIcon>
        </Group>
        <Group justify="space-between">
          <Title order={5}>Collection Display</Title>
          <ActionIcon
            variant="transparent"
            onClick={() => addEditorContent('section_collection', 'content')}
          >
            <RiAddBoxLine size="24" />
          </ActionIcon>
        </Group>
      </Box>
    </Stack>
  );
};

const AddSectionBlocks = () => {
  const {addEditorContent} = useThemeUtils();
  return (
    <Stack>
      <Box>
        <Group justify="space-between">
          <Title order={5}>Add New Block</Title>
          <ActionIcon
            variant="transparent"
            onClick={() => addEditorContent('blocks', 'blocks')}
          >
            <RiAddBoxLine size="24" />
          </ActionIcon>
        </Group>
      </Box>
    </Stack>
  );
};

const AddBlockItems = () => {
  const {addEditorContent} = useThemeUtils();
  return (
    <Stack>
      <Box>
        <Group justify="space-between">
          <Title order={5}>Add New Block Image</Title>
          <ActionIcon
            variant="transparent"
            onClick={() => addEditorContent('block_image', 'block_items')}
          >
            <RiAddBoxLine size="24" />
          </ActionIcon>
        </Group>
      </Box>
    </Stack>
  );
};
