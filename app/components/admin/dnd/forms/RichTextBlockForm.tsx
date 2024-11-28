import TextBox from '../fields/TextBox';
import RichTextField from '../fields/RichTextField';
import { FormProvider } from './ContextForm';
import useThemeUtils from '../useEditorUtils';
import { defaultImage } from '../theme/lib/metaTypes';

export default function RichTextBlockForm() {
  const {getForm} = useThemeUtils();
  const form = getForm(defaultImage)
  return (
    <FormProvider form={form}>
      <form>
      <TextBox label="Name" field="name" />
      <RichTextField label="Rich Text" field="rte" />
      </form>
      </FormProvider>
  );
}
