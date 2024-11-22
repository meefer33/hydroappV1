import Padding from '../fields/Padding';
import {FormProvider, useForm} from '../forms/ContextForm';
import Heading from '../fields/Heading';
import ImagePicker from '../fields/ImagePicker';
import FieldsGroup from '../fields/FieldsGroup';
import TextBox from '../fields/TextBox';
import {useOutletContext} from '@remix-run/react';
import useThemeUtils from '../useEditorUtils';
import {useEffect} from 'react';

export default function LayoutForm() {
  const {layoutId, layout, setLayout}: any = useOutletContext();
  const {saveMeta} = useThemeUtils();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: layout,
    onValuesChange: (values) => {
      saveMeta(layoutId, {
        fields: [
          {
            key: 'layout',
            value: JSON.stringify(form.getValues()),
          },
        ],
      });
      setLayout(form.getValues())
    },
  });

  useEffect(() => {
    form.setValues(layout);
  }, []);

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
