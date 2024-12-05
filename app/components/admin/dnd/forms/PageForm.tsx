import {FormProvider, useForm} from '../forms/ContextForm';
import {nanoid} from 'nanoid';
import {useOutletContext} from '@remix-run/react';
import {useEffect, useState} from 'react';
import NumberSlider from '../fields/NumberSlider';
import useThemeUtils from '../useEditorUtils';
import SectionGroup from '../fields/SectionGroup';
import FieldsGroup from '../fields/FieldsGroup';
import SelectBox from '../fields/SelectBox';
import ColorPicker from '../fields/ColorPicker';

export const sectionProps = {
  padding: {
    top: 'sm',
    bottom: 'sm',
  },
  bgColor: 'primary',
};

export default function FormPage() {
  const {item, editorContent, setEditorContent}: any = useOutletContext();
  const {saveSettings} = useThemeUtils();
  //const [page,setPage] = useState(true)

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      contentWidth: 'lg',
      bg: editorContent?.fields?.settings?.bg
    },
    onValuesChange: async (values) => {
      if(editorContent?.id){
      const up = await saveSettings(editorContent?.id, form.getValues());
      //setEditorContent(up);
      }
    },
  });

  useEffect(() => {
    form.setValues(editorContent?.fields?.settings)
  }, []);

  return (
    <FormProvider form={form}>
      {item?.fields?.settings?.name || item?.handle}
      <form name={nanoid()}>
        <FieldsGroup label="Page Settings" isOpen>
          <SelectBox label="Content Width" field="contentWidth" />
          <SelectBox label="Padding" field="padding" />
          <ColorPicker label="Section Background" field="bg" />
        </FieldsGroup>
        <FieldsGroup label="Layout" isOpen={true}>
          <SelectBox
            label="Layout"
            field="layout"
            data={['h-rs-f', 'h-ls-f']}
          />
        </FieldsGroup>
      </form>
    </FormProvider>
  );
}
