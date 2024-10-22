import {FormProvider, useForm} from '../forms/ContextForm';
import {nanoid} from 'nanoid';
import {useOutletContext} from '@remix-run/react';
import {useEffect} from 'react';
import SelectBox from '../fields/SelectBox';
import useThemeUtils from '../useEditorUtils';
import SectionGroup from '../fields/SectionGroup';
import FieldsGroup from '../fields/FieldsGroup';

export const sectionProps = {
  padding: {
    top: 'sm',
    bottom: 'sm',
  },
  bgColor: 'primary',
};

export default function SectionCollection() {
  const {item, editorContent, setEditorContent, collections}: any =
    useOutletContext();
  const {saveMeta, loadMeta} = useThemeUtils();
  const selectCollectionList = collections?.map((collection: any) => ({
    value: collection.id,
    label: collection.title,
  }));
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      name: '',
      padding: 'xl',
      bg: '',
      slides: {
        spacing: 'md',
        tablet: '50%',
        desktop: '25%',
      },
    },
    onValuesChange: async (values: any) => {
      const data = await saveMeta(item.id, {
        fields: [
          {
            key: 'settings',
            value: JSON.stringify(values),
          },
          {
            key: 'collection',
            value: values?.collection,
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
      {item?.fields?.settings?.name || item?.handle}
      <form name={nanoid()}>
        <SectionGroup label="Section" isOpen={true} />
        <FieldsGroup label="Slides" isOpen={true}>
          <SelectBox label="Slides Spacing" field="slides.spacing" />
          <SelectBox
            label="Slides Desktop"
            field="slides.desktop"
            data={[
              {label: '1', value: '100%'},
              {label: '2', value: '50%'},
              {label: '3', value: '33.333333%'},
              {label: '4', value: '25%'},
              {label: '5', value: '20%'},
              {label: '6', value: '16.66666666666667%'},
            ]}
          />
          <SelectBox
            label="Slides Tablet"
            field="slides.tablet"
            data={[
              {label: '1', value: '100%'},
              {label: '2', value: '50%'},
              {label: '3', value: '33.333333%'},
              {label: '4', value: '25%'},
            ]}
          />
          <SelectBox
            label="Select Collection"
            field="collection"
            data={selectCollectionList}
          />
        </FieldsGroup>
      </form>
    </FormProvider>
  );
}
