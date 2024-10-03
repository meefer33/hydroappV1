import Padding from '../fields/Padding';
import {FormProvider, useForm} from '../forms/ContextForm';
import ColorPicker from '../fields/ColorPicker';
import {nanoid} from 'nanoid';
import {useEditorContext} from '../EditorContext';
import {useOutletContext} from '@remix-run/react';
import {useEffect} from 'react';

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
    initialValues: {
      padding: {
        top: '',
        bottom: '',
      },
      bgColor: '',
    },
    onValuesChange: (values) => {
      handlers.setItemProp(sectionIndex, 'data', form.getValues());
      save();
    },
  });

  const save = () => {
    savePage(handle, sections);
  };

  useEffect(() => {
    form.setValues({
      padding: {
        top: item?.padding?.top ? item?.padding?.top : 'none',
        bottom: item?.padding?.bottom ? item?.padding?.bottom : 'none' ,
      },
      bgColor: item?.bgColor,
    });
  }, [item]);

  return (
    <FormProvider form={form}>
      {selectedItem}
      <form name={nanoid()}>
      <Padding label="Padding" />
        <ColorPicker
          label="Section Background"
          field="bgColor"
          itemValue={item.bgColor}
          section={section}
        />
      </form>
    </FormProvider>
  );
}
