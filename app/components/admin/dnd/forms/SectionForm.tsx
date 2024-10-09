import Padding from '../fields/Padding';
import {FormProvider, useForm} from '../forms/ContextForm';
import ColorPicker from '../fields/ColorPicker';
import {nanoid} from 'nanoid';
import {useEditorContext} from '../EditorContext';
import {useOutletContext} from '@remix-run/react';
import {useEffect} from 'react';
import FieldsGroup from '../fields/FieldsGroup';
import {Title} from '@mantine/core';
import SelectBox from '../fields/SelectBox';
import SectionGroup from '../fields/SectionGroup';

export const sectionProps = {
  padding: {
    top: 'sm',
    bottom: 'sm',
  },
  bgColor: 'primary',
};

export default function SectionForm() {
  const {savePage}: any = useOutletContext();
  const {sections, handlers, selectedItem, handle, item}: any =
    useEditorContext();
  const sectionIndex = sections?.findIndex(
    (section: any) => section.id === selectedItem,
  );
  const section = sections?.find((section: any) => section.id === selectedItem);

  const form = useForm({
    mode: 'controlled',
    onValuesChange: (values) => {
      handlers.setItemProp(sectionIndex, 'data', form.getValues());
      save();
    },
  });

  const save = () => {
    savePage(handle, sections);
  };

  return (
    <FormProvider form={form}>
      {selectedItem}
      <form name={nanoid()}>
        <SectionGroup item={item} isOpen/>
      </form>
    </FormProvider>
  );
}
