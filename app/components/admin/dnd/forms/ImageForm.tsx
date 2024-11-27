import {FormProvider, useForm} from '../forms/ContextForm';
import {useOutletContext} from '@remix-run/react';
import TextBox from '../fields/TextBox';
import ImagePicker from '../fields/ImagePicker';
import {useEffect} from 'react';
import useThemeUtils from '../useEditorUtils';
import {Image} from '@shopify/hydrogen';
import {defaultImage, DefaultImage} from '../theme/lib/metaTypes';

export default function ImageForm() {
  const {item, setEditorContent}: any = useOutletContext();
  const {loadMeta, saveMeta} = useThemeUtils();

  const form = useForm({
    mode: 'controlled',
    initialValues: defaultImage,
    onValuesChange: async (values: DefaultImage) => {
      console.log(values?.image?.id);
      const v = form.getValues();

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
          {
            key: 'image',
            value: values?.image?.id,
          },
        ],
      });
      setEditorContent(data);
    },
  });

  useEffect(() => {
    item.settings && loadMeta(item.id, form);
  }, [item]);

  return (
    <FormProvider form={form}>
      <form>
        <TextBox
          label="Name"
          field="name"
          value={item?.fields?.settings?.name || item?.handle}
        />
        <TextBox label="width" field="width" />
        <ImagePicker label="Pick Image" field="image" />
      </form>
      {item?.fields?.image?.url && (
        <Image
          sizes="(min-width: 45em) 50vw, 100vw"
          data={item?.fields?.image}
          //aspectRatio="1/1"
          style={{objectFit: 'contain'}}
        />
      )}
    </FormProvider>
  );
}
