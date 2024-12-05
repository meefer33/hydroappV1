import Padding from '../fields/Padding';
import Heading from '../fields/Heading';
import ImagePicker from '../fields/ImagePicker';
import FieldsGroup from '../fields/FieldsGroup';
import TextBox from '../fields/TextBox';
import ColorPicker from '../fields/ColorPicker';
import {FormProvider} from './ContextForm';
import useThemeUtils from '../useEditorUtils';
import {defaultHeader} from '../theme/lib/metaTypes';
import {useOutletContext} from '@remix-run/react';
import {useEffect} from 'react';

export default function HeaderDefaultForm() {
  const {item}: any = useOutletContext();
  const {getForm, getFormInitValues} = useThemeUtils();

  const form = getForm(defaultHeader);

  useEffect(() => {
    form.setValues(getFormInitValues(defaultHeader));
  }, [item.id]);

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
