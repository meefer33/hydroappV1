import {FormProvider, useForm} from '../forms/ContextForm';
import {useEditorContext} from '../EditorContext';
import {useOutletContext} from '@remix-run/react';
import SectionGroup from '../fields/SectionGroup';
import SelectBox from '../fields/SelectBox';
import {useEffect} from 'react';

export const sectionProps = {
  padding: {
    top: 'sm',
    bottom: 'sm',
  },
  bgColor: 'primary',
};

export default function GridForm() {
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

  useEffect(() => {
    form.setValues({
      columns: item?.columns,
    });
  }, [item]);

  return (
    <FormProvider form={form}>
      {selectedItem}
      <form>
        <SelectBox label="Columns" field="columns" data={["1","2","3","4"]} />
        <SectionGroup item={item} isOpen />
      </form>
    </FormProvider>
  );
}
