import {FormProvider, useForm} from './ContextForm';
import ColorPicker from '../fields/ColorPicker';
import {useOutletContext} from '@remix-run/react';
import SelectBox from '../fields/SelectBox';
import TextBox from '../fields/TextBox';
import useThemeUtils from '../useEditorUtils';
import {DefaultBlocks, defaultBlocks} from '../theme/lib/metaTypes';

export default function Blocks() {
  const {item, setEditorContent}: any = useOutletContext();
  const {saveMeta} = useThemeUtils();

  const form = useForm({
    mode: 'controlled',
    initialValues: item?.fields?.settings || defaultBlocks,
    onValuesChange: async (values: DefaultBlocks) => {
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
      setEditorContent(data);
    },
  });

  return (
    <FormProvider form={form}>
      <form>
        <TextBox
          label="Name"
          field="name"
          value={item?.fields?.settings?.name || item?.handle}
        />
        <SelectBox label="Padding" field="padding" />
        <ColorPicker label="Section Background" field="bg" />
      </form>
    </FormProvider>
  );
}
