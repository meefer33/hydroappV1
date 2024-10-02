import Padding from '../fields/Padding';
import {FormProvider, useForm} from '../forms/ContextForm';
import Heading from '../fields/Heading';
import ImagePicker from '../fields/ImagePicker';
import FieldsGroup from '../fields/FieldsGroup';
import TextBox from '../fields/TextBox';
import ColorPicker from '../fields/ColorPicker';

export default function SectionForm({selectedItem,sections,handlers}: any) {

  const ind = sections?.findIndex((section:any)=>section.id === selectedItem)
  console.log('sectfo',selectedItem,sections,ind)
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      padding: {
        top: 'sm',
        bottom: 'sm'
      },
      bg_color:'primary',
    },
    onValuesChange: (values) => {
      //saveLayout('default', form.getValues());
      handlers.setItemProp(ind, 'data', values)
      console.log('sectionform',form.getValues(),values)
    },
  });

  return (
    <FormProvider form={form}>
      {selectedItem}
      <form>
        <Padding label="Padding" />
        <ColorPicker label="Section Background" field="bg_color" />
      </form>
    </FormProvider>
  );
}
