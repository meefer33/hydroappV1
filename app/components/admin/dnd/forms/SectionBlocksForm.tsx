import NumberSlider from '../fields/NumberSlider';
import SectionGroup from '../fields/SectionGroup';
import FieldsGroup from '../fields/FieldsGroup';
import {FormProvider, useForm} from './ContextForm';
import useThemeUtils from '../useEditorUtils';
import { DefaultSectionBlocks, defaultSectionBlocks } from '../theme/lib/metaTypes';
import { useOutletContext } from '@remix-run/react';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';

export default function SectionBlocksForm() {
  const {item}: any = useOutletContext();
  const {getForm,getFormInitValues} = useThemeUtils();

  const form = getForm(defaultSectionBlocks)

  useEffect(() => {
    form.setValues(getFormInitValues(defaultSectionBlocks))
  }, [item.id]);
  
  return (
    <FormProvider form={form}>
      <form name={nanoid()}>
        <SectionGroup label="Section" isOpen={true} />
        <FieldsGroup label="Columns" isOpen={true}>
          <NumberSlider label="Columns Mobile" max={12} field="cols.mobile" />
          <NumberSlider label="Columns Tablet" max={12} field="cols.tablet" />
          <NumberSlider label="Columns Desktop" max={12} field="cols.desktop" />
        </FieldsGroup>
      </form>
    </FormProvider>
  );
}
