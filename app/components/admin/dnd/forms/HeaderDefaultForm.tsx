import Padding from '../fields/Padding';
import {FormProvider, useForm} from '../forms/ContextForm';
import Heading from '../fields/Heading';
import ImagePicker from '../fields/ImagePicker';
import FieldsGroup from '../fields/FieldsGroup';
import TextBox from '../fields/TextBox';
import {useOutletContext} from '@remix-run/react';
import useThemeUtils from '../useEditorUtils';

import {DefaultHeader, defaultHeader} from '../theme/lib/metaTypes';
import ColorPicker from '../fields/ColorPicker';

export default function HeaderDefaultForm() {
  const {setEditorContent, item}: any = useOutletContext();
  const {saveMeta} = useThemeUtils();
console.log('item',item)
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: item?.fields?.settings || defaultHeader,
    onValuesChange: async (values: DefaultHeader) => {
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
        <FieldsGroup label="Header" isOpen="true">
          <TextBox
            label="Name"
            field="name"
            value={item?.fields?.settings?.name || item?.handle}
          />
          <Padding label="Padding" />
          <Heading label="Brand Name" />
          <FieldsGroup label="Logo">
            <TextBox label="width" field="logo.width" />
            <ImagePicker label="Pick Logo" field="logo.image" />
          </FieldsGroup>
          <FieldsGroup label="Scroller">
            <ColorPicker
              label="Scroller Background"
              field="scrollMenu.scrollBg"
            />
          </FieldsGroup>
        </FieldsGroup>
      </form>
    </FormProvider>
  );
}
