import {FormProvider, useForm} from './ContextForm';
import {useOutletContext} from '@remix-run/react';
import NumberSlider from '../fields/NumberSlider';
import useThemeUtils from '../useEditorUtils';
import SectionGroup from '../fields/SectionGroup';
import FieldsGroup from '../fields/FieldsGroup';
import {
  defaultSectionBlocks,
  DefaultSectionBlocks,
} from '../theme/lib/metaTypes';
import TextBox from '../fields/TextBox';

export default function SectionBlocksForm() {
  const {item, setEditorContent}: any = useOutletContext();
  const {saveMeta} = useThemeUtils();
console.log('item',item)
  const form = useForm({
    mode: 'controlled',
    initialValues: item?.fields?.settings || defaultSectionBlocks,
    onValuesChange: async (values: DefaultSectionBlocks) => {
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
        <SectionGroup label="Section" isOpen={true} />
        <TextBox
          label="Name"
          field="name"
          value={item?.fields?.settings?.name || item?.handle}
        />
        <FieldsGroup label="Columns" isOpen={true}>
          <NumberSlider label="Columns Mobile" max={12} field="cols.mobile" />
          <NumberSlider label="Columns Tablet" max={12} field="cols.tablet" />
          <NumberSlider label="Columns Desktop" max={12} field="cols.desktop" />
        </FieldsGroup>
      </form>
    </FormProvider>
  );
}
