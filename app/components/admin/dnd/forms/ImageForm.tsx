import {useOutletContext} from '@remix-run/react';
import TextBox from '../fields/TextBox';
import ImagePicker from '../fields/ImagePicker';
import {Image} from '@shopify/hydrogen';
import {FormProvider} from './ContextForm';
import { defaultImage } from '../theme/lib/metaTypes';
import useThemeUtils from '../useEditorUtils';

export default function ImageForm() {
  const {item}: any = useOutletContext();
  const {getForm} = useThemeUtils();
  const form = getForm(defaultImage)

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

        {item?.fields?.image?.url && (
          <Image
            sizes="(min-width: 45em) 50vw, 100vw"
            data={item?.fields?.image}
            //aspectRatio="1/1"
            style={{objectFit: 'contain'}}
          />
        )}
      </form>
    </FormProvider>
  );
}
