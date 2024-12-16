import {ActionIcon, Container, Group, Table} from '@mantine/core';
import dayjs from 'dayjs/esm/index.js';
import {Link, useOutletContext} from '@remix-run/react';
import {RiDeleteBin5Line, RiEdit2Line, RiExternalLinkLine} from '@remixicon/react';
import useThemeUtils from '~/components/admin/dnd/useEditorUtils';
import CreateNewThemeForm from '~/components/admin/dnd/forms/CreateNewThemeForm';
import ModalDash from '~/components/admin/dnd/ModalDash';

export default function Themes() {
  const {themes, setThemes, openModal, setMetaData}: any = useOutletContext();
  const {deleteMetaobject} = useThemeUtils();

  const deleteTheme = async (id) => {
    setThemes(themes.filter((theme) => theme.id !== id));
    await deleteMetaobject(id);
  };

  return (
    <Container size="xl">
      <Group align="end" justify="end">
        <CreateNewThemeForm />
      </Group>
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Handle</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Created At</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {themes?.map((theme: any) => {
            return (
              <Table.Tr key={theme.id}>
                <Table.Td>{theme?.handle}</Table.Td>
                <Table.Td>{theme?.fields?.name}</Table.Td>
                <Table.Td>
                  {dayjs(theme.updatedAt).format('MM-DD-YYYY h:mm a')}
                </Table.Td>
                <Table.Td>
                  <ActionIcon
                    onClick={() => deleteTheme(theme.id)}
                    size="sm"
                    mr="lg"
                    color="red"
                  >
                    <RiDeleteBin5Line />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => {
                      openModal();
                      setMetaData(theme);
                    }}
                    size="sm"
                    mr="lg"
                    color="green"
                  >
                    <RiEdit2Line />
                  </ActionIcon>
                  <ActionIcon
                    component={Link}
                    to={`/themes/${theme.handle}`}
                    //target="_blank"
                    size="sm"
                  >
                    <RiExternalLinkLine />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
      <ModalDash />
    </Container>
  );
}
