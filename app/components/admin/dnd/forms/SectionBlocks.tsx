import {FormProvider, useForm} from '../forms/ContextForm';
import {nanoid} from 'nanoid';
import {useOutletContext} from '@remix-run/react';
import {useEffect} from 'react';
import NumberSlider from '../fields/NumberSlider';
import useThemeUtils from '../useEditorUtils';
import SectionGroup from '../fields/SectionGroup';
import FieldsGroup from '../fields/FieldsGroup';

export const sectionProps = {
  padding: {
    top: 'sm',
    bottom: 'sm',
  },
  bgColor: 'primary',
};

export default function SectionBlocks() {
  const {item, editorContent, setEditorContent}: any = useOutletContext();
  const {loadMeta, saveSettings} = useThemeUtils();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      name: '',
      contentWidth: 'lg',
      padding: 'xl',
      bg: 'primary',
      cols: {
        mobile: 1,
        tablet: 2,
        desktop: 4,
      },
      spacing: 'xl',
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
        <SectionGroup label="Section" isOpen={true} />
        <FieldsGroup label="Columns" isOpen={true}>
          <NumberSlider label="Columns Mobile" max={12} field="cols.mobile" />
          <NumberSlider label="Columns Tablet" max={12} field="cols.tablet" />
          <NumberSlider label="Columns Desktop" max={12} field="cols.desktop" />
        </FieldsGroup>
      </form>
    </FormProvider>
  );
}
