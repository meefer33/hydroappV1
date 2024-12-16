import {ActionIcon, Table} from '@mantine/core';
import FieldsGroup from './fields/FieldsGroup';
import {Link, useOutletContext} from '@remix-run/react';
import {RiDeleteBin5Line} from '@remixicon/react';
import useThemeUtils from './useEditorUtils';

export default function SelectTheme() {
  const {themes, setThemes}: any = useOutletContext();
  const {deleteMetaobject} = useThemeUtils();
  console.log('th', themes);
  const deleteTheme = async (id) => {
    setThemes(themes.filter((theme) => theme.id !== id));
    await deleteMetaobject(id);
  };

  return (
    <FieldsGroup label="Themes" isOpen={true}>
      <Table>
        <Table.Tbody>
          {themes?.map((theme: any, i) => {
            return (
              <Table.Tr key={theme.id}>
                <Table.Td>
                  <Link
                    key={theme.handle}
                    to={`/themes/${theme.handle}`}
                    reloadDocument
                  >
                    {theme.fields?.name}
                  </Link>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </FieldsGroup>
  );
}
