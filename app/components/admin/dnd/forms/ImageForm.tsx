import {FormProvider, useForm} from '../forms/ContextForm';
import {useOutletContext} from '@remix-run/react';
import FieldsGroup from '../fields/FieldsGroup';
import TextBox from '../fields/TextBox';
import ImagePicker from '../fields/ImagePicker';
import { loadMeta, saveSettings } from '../theme/themeUtils';
import { useEffect } from 'react';

export const sectionProps = {
  padding: {
    top: 'sm',
    bottom: 'sm',
  },
  bgColor: 'primary',
};

export default function ImageForm() {

  const {item,setEditorContent}: any = useOutletContext();

  const form = useForm({
    mode: 'controlled',
    onValuesChange: async (values) => {
      const data = await saveSettings(item.id,form.getValues());
      setEditorContent(data);
    },
  });

  useEffect(() => {
    loadMeta(item.id,form);
  }, [item]);

  return (
    <FormProvider form={form}>
      {item.id}
      <form>
      <FieldsGroup label="Image">
          <TextBox label="width" field="width" />
          <ImagePicker label="Pick Logo" field="image" />
        </FieldsGroup>
      </form>
    </FormProvider>
  );
}
