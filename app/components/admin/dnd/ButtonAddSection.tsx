import {ActionIcon, Box, Button, Container, Group} from '@mantine/core';
import {useOutletContext} from '@remix-run/react';
import {RiAddCircleLine, RiAddLine} from '@remixicon/react';

export default function ButtonAddSection({data = {}}: any) {
  const {openModal, setMetaData}: any = useOutletContext();
  //console.log('add section', data)
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
}
