import {useOutletContext} from '@remix-run/react';
import {nanoid} from 'nanoid';
import { useForm } from '@mantine/form';

export default function useThemeUtils() {
  const {
    setEditorContent,
    updateMetaVersionId,
    metaData,
    closeModal,
    item,
    setItem,
    setSelectedItem,
    setPage
  }: any = useOutletContext();

  const getFormInitValues = (initFormValues: any) => {
    return item?.fields?.settings || {...initFormValues,name: item?.handle}
  };

  const getForm = (initFormValues) => {
    return useForm({
      mode: 'controlled',
      initialValues: getFormInitValues(initFormValues),
      onValuesChange: async (values: any) => {
        const data = await saveMeta(item.id, {
          fields: [
            {
              key: 'name',
              value: values.name,
            },
            {
              key: 'settings',
              value: JSON.stringify(values),
            },
          ],
        });
      },
    });
  }

  const updateMetaVersion = async () => {
    const response = await fetch('/api/UpdateMetaobject', {
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
    setEditorContent(data);
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

  const saveContent = async (id: any, meta: any) => {
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
    const data = await response.json();
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
    const umv: any = await updateMetaVersion();
    setItem(data?.data?.metaobjectCreate?.metaobject);
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

  const addContent = async (id:any,field:any) => {
    const response = await fetch('/api/create-metaobject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'content',
      }),
    });
    const data: any = await response.json();
    const nm = await saveMeta(id, {
      fields: [
        {
          key: field,
          value:data?.data?.metaobjectCreate?.metaobject?.id,
        },
      ],
    });
    setPage(nm)
  }

  return {
    getFormInitValues,
    getForm,
    saveMeta,
    saveContent,
    addEditorContent,
    deleteEditorContent,
    updateMetaVersion,
    addContent
  };
}
