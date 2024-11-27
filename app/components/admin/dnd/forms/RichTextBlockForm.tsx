import {FormProvider, useForm} from './ContextForm';
import {useOutletContext} from '@remix-run/react';
import {useEffect} from 'react';
import TextBox from '../fields/TextBox';
import useThemeUtils from '../useEditorUtils';
import RichTextField from '../fields/RichTextField';
import {
  DefaultRichTextEditor,
  defaultRichTextEditor,
} from '../theme/lib/metaTypes';

export default function RichTextBlock() {
  const {item, setEditorContent}: any = useOutletContext();
  const {loadMeta, saveMeta} = useThemeUtils();

  const form = useForm({
    mode: 'controlled',
    initialValues: defaultRichTextEditor,
    onValuesChange: async (values: DefaultRichTextEditor) => {
      const data = await saveMeta(item.id, {
        fields: [
          {
            key: 'name',
            value: values.name || item?.handle,
          },
          {
            key: 'settings',
            value: JSON.stringify(values),
          },
        ],
      });
      setEditorContent(data);
    },
  });

  useEffect(() => {
    item.settings && loadMeta(item.id, form);
  }, [item]);

  return (
    <FormProvider form={form}>
      <form>
        <TextBox
          label="Name"
          field="name"
          value={item?.fields?.settings?.name || item?.handle}
        />
        <RichTextField label="Rich Text" field="rte" />
      </form>
    </FormProvider>
  );
}
