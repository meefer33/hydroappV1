import Padding from '../fields/Padding';
import {FormProvider, useForm} from '../forms/ContextForm';
import ColorPicker from '../fields/ColorPicker';
import {sectionProps} from '../components/Section';
import {useEffect} from 'react';
import { useForceUpdate } from '@mantine/hooks';
import { nanoid } from 'nanoid';

export default function SectionForm({
  sections,
  handlers,
  selectedItem,
  savePage,
  handle,
  setUpdate
}: any) {
  const sectionIndex = sections?.findIndex(
    (section: any) => section.id === selectedItem,
  );
  const section = sections?.find(
    (section: any) => section.id === selectedItem,
  );

  
  console.log('sectionform', section);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: section?.data || sectionProps,
    onValuesChange: (values) => {
      setUpdate(true)
      handlers.setItemProp(
        sectionIndex,
        'data',
        form.getValues(),
        values,
      );
      savePage(handle, sections);
      setUpdate(false)
    },
  });


  return (
    <FormProvider form={form}>
      {selectedItem}
      <form name={nanoid()}>
        <Padding label="Padding" />
        <ColorPicker label="Section Background" field="bgColor" />
      </form>
    </FormProvider>
  );
}
