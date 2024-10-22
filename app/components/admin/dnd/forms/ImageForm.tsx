import {FormProvider, useForm} from '../forms/ContextForm';
import {useOutletContext} from '@remix-run/react';
import TextBox from '../fields/TextBox';
import ImagePicker from '../fields/ImagePicker';
import {useEffect} from 'react';
import useThemeUtils from '../useEditorUtils';
import {Image} from '@shopify/hydrogen';

export const sectionProps = {
  padding: {
    top: 'sm',
    bottom: 'sm',
  },
  bgColor: 'primary',
};

export default function ImageForm() {
  const {item, setEditorContent}: any = useOutletContext();
  const {loadMeta, saveMeta} = useThemeUtils();

  const form = useForm({
    mode: 'controlled',
    onValuesChange: async (values: any) => {
      console.log(values?.image?.id);
      const v = form.getValues();

      const data = await saveMeta(item.id, {
        fields: [
          {
            key: 'settings',
            value: JSON.stringify(v),
          },
          {
            key: 'image',
            value: v?.image?.id,
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
      {item.id}
      <form>
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
