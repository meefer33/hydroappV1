import {FormProvider, useForm} from '../forms/ContextForm';
import {nanoid} from 'nanoid';
import {useOutletContext} from '@remix-run/react';
import {useEffect} from 'react';
import NumberSlider from '../fields/NumberSlider';
import useThemeUtils from '../useEditorUtils';
import SectionGroup from '../fields/SectionGroup';
import FieldsGroup from '../fields/FieldsGroup';
import SelectBox from '../fields/SelectBox';

export const sectionProps = {
  padding: {
    top: 'sm',
    bottom: 'sm',
  },
  bgColor: 'primary',
};

export default function FormPage() {
  const {item, editorContent, setEditorContent}: any = useOutletContext();
  const {loadMeta, saveSettings} = useThemeUtils();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      name: '',
      contentWidth: 'lg',
      padding: 'xl',
      bg: 'primary',
    },
    onValuesChange: async (values) => {
      const data = await saveSettings(item.id, form.getValues());
      setEditorContent(data);
    },
  });

  useEffect(() => {
    //loadMeta(item.id, form);
  }, [item]);

  return (
    <FormProvider form={form}>
      {item?.fields?.settings?.name || item?.handle}
      <form name={nanoid()}>
        <SectionGroup label="Section" isOpen={true} />
        <FieldsGroup label="Layout" isOpen={true}>
          <SelectBox label="Layout" field="layout" data={['h-rs-f','h-ls-f']} />
        </FieldsGroup>
      </form>
    </FormProvider>
  );
}
