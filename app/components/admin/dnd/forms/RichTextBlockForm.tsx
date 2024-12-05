import TextBox from '../fields/TextBox';
import RichTextField from '../fields/RichTextField';
import {FormProvider} from './ContextForm';
import useThemeUtils from '../useEditorUtils';
import {defaultRichTextEditor} from '../theme/lib/metaTypes';
import {useOutletContext} from '@remix-run/react';
import {useEffect} from 'react';

export default function RichTextBlockForm() {
  const {item}: any = useOutletContext();
  const {getForm, getFormInitValues} = useThemeUtils();

  const form = getForm(defaultRichTextEditor);

  useEffect(() => {
    form.setValues(getFormInitValues(defaultRichTextEditor));
  }, [item.id]);

  return (
    <FormProvider form={form}>
      <form>
        <TextBox label="Name" field="name" />
        <RichTextField label="Rich Text" field="rte" />
      </form>
    </FormProvider>
  );
}
