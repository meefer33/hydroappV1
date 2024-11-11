import {FormProvider, useForm} from '../forms/ContextForm';
import ColorPicker from '../fields/ColorPicker';
import {nanoid} from 'nanoid';
import {useOutletContext} from '@remix-run/react';
import {useEffect} from 'react';
import SelectBox from '../fields/SelectBox';
import TextBox from '../fields/TextBox';
import useThemeUtils from '../useEditorUtils';

export default function Blocks() {
  const {item, editorContent, setEditorContent}: any = useOutletContext();
  const {loadMeta, saveSettings} = useThemeUtils();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      name: '',
      padding: 'xl',
     // bg: 'primary',
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
        <SelectBox label="Padding" field="padding" />
        <ColorPicker label="Section Background" field="bg" />
      </form>
    </FormProvider>
  );
}
