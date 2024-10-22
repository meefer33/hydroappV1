import {FormProvider, useForm} from '../forms/ContextForm';
import {nanoid} from 'nanoid';
import {useOutletContext} from '@remix-run/react';
import {useEffect} from 'react';
import TextBox from '../fields/TextBox';
import useThemeUtils from '../useEditorUtils';
import RichTextField from '../fields/RichTextField';

export default function RichTextBlock() {
  const {item, editorContent, setEditorContent}: any = useOutletContext();
  const {loadMeta, saveSettings} = useThemeUtils();

  const form = useForm({
    mode: 'controlled',
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
        <RichTextField label="Rich Text" field="rte" />
      </form>
    </FormProvider>
  );
}
