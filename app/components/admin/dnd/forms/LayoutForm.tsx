import Padding from '../fields/Padding';
import {FormProvider, useForm} from '../forms/ContextForm';
import Heading from '../fields/Heading';
import ImagePicker from '../fields/ImagePicker';
import FieldsGroup from '../fields/FieldsGroup';
import TextBox from '../fields/TextBox';
import { useOutletContext } from '@remix-run/react';
import { useEditorContext } from '../EditorContext';

export default function LayoutForm() {
  const {saveLayout,layouts}: any = useOutletContext();
  //const {setTheme, themeConfig}: any = useEditorContext();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: layouts[0]?.fields?.layout,
    onValuesChange: (values) => {
      saveLayout('default', form.getValues());
      //console.log('header',form.getValues(),values)
    },
  });

  return (
    <FormProvider form={form}>
      <form>
        <Padding label="Padding" />
        <Heading label="Brand Name" />
        <FieldsGroup label="Logo">
          <TextBox label="width" field="logo.width" />
          <ImagePicker label="Pick Logo" field="logo.image" />
        </FieldsGroup>
      </form>
    </FormProvider>
  );
}
