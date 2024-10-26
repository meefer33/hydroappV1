import {ActionIcon, Box, Button, Container, Group} from '@mantine/core';
import {useOutletContext} from '@remix-run/react';
import {RiAddCircleLine, RiAddLine} from '@remixicon/react';

export default function ButtonAddSection({data = {}}: any) {
  const {openModal, setMetaData}: any = useOutletContext();
  const changeTypeName = (type: any) => {
    switch (type) {
      case 'content':
        return <AddButton data={data}>Add New Section</AddButton>;
      case 'section_blocks':
        return <AddButton data={data}>Insert New Block</AddButton>;
      case 'blocks':
        return <AddButton data={data}>Insert New Block Item</AddButton>;
      default:
        return <></>;
    }
  };
  return changeTypeName(data.type);
}

const AddButton = ({data, children}) => {
  const {openModal, setMetaData}: any = useOutletContext();
  return (
    <Container fluid>
      <Group justify="center" pos="relative">     
          <ActionIcon
            variant="filled"
            color="gray.7"
            size="sm"
            radius="xl"
            aria-label="Settings"
            onClick={() => {
              openModal();
              setMetaData(data);
            }}
          >
            <RiAddLine size="18" />
          </ActionIcon>
      </Group>
    </Container>
  );
};
