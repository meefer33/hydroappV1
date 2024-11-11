import {generateColors} from '@mantine/colors-generator';
import {createTheme, DEFAULT_THEME, mergeMantineTheme} from '@mantine/core';
import {useOutletContext} from '@remix-run/react';
import {nanoid} from 'nanoid';
import {defaultTheme} from './theme/lib/theme';

export default function useThemeUtils() {
  const {
    setEditorContent,
    updateMetaVersionId,
    metaData,
    closeModal,
    setItem,
    setSelectedItem
  }: any = useOutletContext();

  const loadMeta = async (selectedItem: any, form: any) => {
    const values: any = await fetch(
      `/api/get-metaobject?id=${selectedItem || ''}`,
    ).then((res) => res.json());
    form.setValues(values?.fields?.settings);
  };

  const updateMetaVersion = async () => {
    const response = await fetch('/api/UpdatePage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: updateMetaVersionId,
        metaobject: {
          fields: [
            {
              key: 'version',
              value: nanoid(),
            },
          ],
        },
      }),
    });
    const data: any = await response.json();
    setEditorContent(data)
    return data;
  };

  const saveMeta = async (id: any, meta: any) => {
    const response = await fetch('/api/UpdateMetaobject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        metaobject: meta,
      }),
    });

    //const status = response.status;
    const d = await response.json();
    const data: any = await updateMetaVersion();
    return data;
  };

  const saveSettings = async (id: any, meta: any) => {
    const response = await fetch('/api/UpdateMetaobject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //handle: editorContent.handle,
        id: id,
        metaobject: {
          fields: [
            {
              key: 'settings',
              value: JSON.stringify(meta),
            },
          ],
        },
      }),
    });

    await response.json();
    const data: any = await updateMetaVersion();
    return data;
  };

  const addEditorContent = async (type: any, field: any) => {
    const response = await fetch('/api/create-metaobject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: type,
      }),
    });
    const data: any = await response.json();
    const sectionIds: any = [];
    console.log(metaData)
    metaData?.fields[field]?.map((section: any) => {
      sectionIds.push(section.id);
    });
    sectionIds.push(data?.data?.metaobjectCreate?.metaobject?.id);
    const nm = await saveMeta(metaData.id, {
      fields: [
        {
          key: field,
          value: JSON.stringify(sectionIds),
        },
      ],
    });
    setItem({id:data?.data?.metaobjectCreate?.metaobject?.id,type:type});
    setSelectedItem(data?.data?.metaobjectCreate?.metaobject?.id);
    closeModal();
  };

  const deleteEditorContent = async (id: any) => {
    setItem(null);
    const response = await fetch('/api/delete-metaobject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    await response.json();
    const data: any = await updateMetaVersion();
    setEditorContent(data);
    return true;
  };

  return {
    loadMeta,
    saveMeta,
    saveSettings,
    addEditorContent,
    deleteEditorContent,
    updateMetaVersion
  };
}
