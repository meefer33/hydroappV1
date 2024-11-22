import Padding from '../fields/Padding';
import {FormProvider, useForm} from '../forms/ContextForm';
import Heading from '../fields/Heading';
import ImagePicker from '../fields/ImagePicker';
import FieldsGroup from '../fields/FieldsGroup';
import TextBox from '../fields/TextBox';
import {useOutletContext} from '@remix-run/react';
import useThemeUtils from '../useEditorUtils';
import {useEffect} from 'react';

export default function HeaderDefaultForm() {
  const {setEditorContent, item}: any = useOutletContext();
  const {saveMeta,loadMeta} = useThemeUtils();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      padding: {
        top: 'sm',
        bottom: 'sm',
        left: 'sm',
        right: 'sm',
      },
      logo: {
        image: '',
        width: '',
      },
      heading: {
        text: '',
        textSpacing: '',
        textColor: '',
        subText: '',
        subTextSpacing: '',
        subTextColor: '',
      },
      scrollMenu: {
        scrollBg: '',
      },
    },
    onValuesChange: async (values: any) => {
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
    loadMeta(item.id, form);
  }, [item]);


  return (
    <FormProvider form={form}>
      <form>
      <TextBox label="Name" field="name" value={item?.fields?.settings?.name || item?.handle} />
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
