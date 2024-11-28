import {useOutletContext} from '@remix-run/react';
import SelectBox from '../fields/SelectBox';
import SectionGroup from '../fields/SectionGroup';
import FieldsGroup from '../fields/FieldsGroup';
import {FormProvider} from './ContextForm';
import useThemeUtils from '../useEditorUtils';
import { defaultSectionCollection } from '../theme/lib/metaTypes';

export default function SectionCollection() {
  const {collections}: any = useOutletContext();

  const selectCollectionList = collections?.map((collection: any) => ({
    value: collection.id,
    label: collection.title,
  }));

  const {getForm} = useThemeUtils();
  const form = getForm(defaultSectionCollection)

  return (
    <FormProvider form={form}>
      <form>
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
