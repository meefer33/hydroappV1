import { useOutletContext } from '@remix-run/react';
import ColorPicker from '../fields/ColorPicker';
import SelectBox from '../fields/SelectBox';
import TextBox from '../fields/TextBox';
import { DefaultBlocks, defaultBlocks } from '../theme/lib/metaTypes';
import useThemeUtils from '../useEditorUtils';
import {FormProvider, useForm} from './ContextForm';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';

export default function BlocksForm() {
  const {item}: any = useOutletContext();
  const {getForm,getFormInitValues} = useThemeUtils();

  const form = getForm(defaultBlocks)

  useEffect(() => {
    form.setValues(getFormInitValues(defaultBlocks))
  }, [item.id]);
  
  return (
    <FormProvider form={form}>
      <form name={nanoid()}>
        <TextBox label="Name" field="name" />
        <SelectBox label="Padding" field="padding" />
        <ColorPicker label="Section Background" field="bg" />
      </form>
    </FormProvider>
  );
}
