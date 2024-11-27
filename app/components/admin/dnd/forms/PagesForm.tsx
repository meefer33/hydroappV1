import {FormProvider, useForm} from '../forms/ContextForm';
import {nanoid} from 'nanoid';
import {useOutletContext} from '@remix-run/react';
import {useEffect} from 'react';
import TextBox from '../fields/TextBox';
import useThemeUtils from '../useEditorUtils';
import RichTextField from '../fields/RichTextField';
import SelectBox from '../fields/SelectBox';

export default function PagesForm() {
  const {item, templates, editorContent, setEditorContent}: any = useOutletContext();
  const {loadMeta, saveSettings} = useThemeUtils();

  const templatesList = templates?.map((template: any) => ({
    value: template.id,
    label: template.title,
  }));

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      name: '',
      rte: 'add text',
    },
    onValuesChange: async (values) => {
      const data = await saveSettings(item.id, form.getValues());
      setEditorContent(data);
    },
  });

  useEffect(() => {
    loadMeta(item.id, form);
  }, [item]);

  return (
    <FormProvider form={form}>
      {item?.fields?.settings?.name || item?.handle}
      <form name={nanoid()}>
        <TextBox label="Name" field="name" />
        <SelectBox
            label="Select Template"
            field="template"
            data={templatesList}
          />
      </form>
    </FormProvider>
  );
}
