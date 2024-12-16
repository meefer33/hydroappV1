import {ActionIcon, Container, Group, Table} from '@mantine/core';
import dayjs from 'dayjs/esm/index.js';
import {Link, useOutletContext} from '@remix-run/react';
import {RiDeleteBin5Line, RiEdit2Line, RiExternalLinkLine} from '@remixicon/react';
import CreateNewTemplateForm from '~/components/admin/dnd/forms/CreateNewTemplateForm';
import useThemeUtils from '~/components/admin/dnd/useEditorUtils';
import ModalDash from '~/components/admin/dnd/ModalDash';

export default function Themes() {
  const {templates, setTemplates, openModal, setMetaData}: any = useOutletContext();
  const {deleteMetaobject} = useThemeUtils();

  const deleteTemplate= async (id) => {
    setTemplates(templates.filter((template) => template.id !== id));
    await deleteMetaobject(id);
  };

  return (
    <Container size="xl">
      <Group align="end" justify="end">
        <CreateNewTemplateForm />
      </Group>

      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
          <Table.Th>Handle</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Theme</Table.Th>
            <Table.Th>Created At</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {templates?.map((template: any) => {
            console.log(template)
            return (
              <Table.Tr key={template?.id}>
                <Table.Td>{template?.handle}</Table.Td>
                <Table.Td>{template?.fields?.name}</Table.Td>
                <Table.Td>{template?.fields?.theme?.fields?.name}</Table.Td>
                <Table.Td>
                  {dayjs(template?.updatedAt).format('MM-DD-YYYY h:mm a')}
                </Table.Td>
                <Table.Td>
                <ActionIcon
                    onClick={() => deleteTemplate(template.id)}
                    size="sm"
                    mr="lg"
                    color="red"
                  >
                    <RiDeleteBin5Line />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => {
                      openModal();
                      setMetaData(template);
                    }}
                    size="sm"
                    mr="lg"
                    color="green"
                  >
                    <RiEdit2Line />
                  </ActionIcon>
                  <ActionIcon
                    component={Link}
                    to={`/templates/${template.handle}`}
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
