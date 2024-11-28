import Padding from '../fields/Padding';
import Heading from '../fields/Heading';
import ImagePicker from '../fields/ImagePicker';
import FieldsGroup from '../fields/FieldsGroup';
import TextBox from '../fields/TextBox';
import ColorPicker from '../fields/ColorPicker';
import { FormProvider } from './ContextForm';
import useThemeUtils from '../useEditorUtils';
import { defaultHeader,DefaultHeader } from '../theme/lib/metaTypes';

export default function HeaderDefaultForm() {
  const {getForm} = useThemeUtils();
  const form = getForm(defaultHeader)

  return (
    <FormProvider form={form}>
      <form>
    <FieldsGroup label="Header" isOpen="true">
      <TextBox label="Name" field="name" />
      <Padding label="Padding" />
      <Heading label="Brand Name" />
      <FieldsGroup label="Logo">
        <TextBox label="width" field="logo.width" />
        <ImagePicker label="Pick Logo" field="logo.image" />
      </FieldsGroup>
      <FieldsGroup label="Scroller">
        <ColorPicker label="Scroller Background" field="scrollMenu.scrollBg" />
      </FieldsGroup>
    </FieldsGroup>
    </form>
    </FormProvider>
  );
}
