import ColorPicker from '../fields/ColorPicker';
import SelectBox from '../fields/SelectBox';
import TextBox from '../fields/TextBox';
import { defaultBlocks } from '../theme/lib/metaTypes';
import useThemeUtils from '../useEditorUtils';
import {FormProvider} from './ContextForm';

export default function BlocksForm() {
  const {getForm} = useThemeUtils();
  const form = getForm(defaultBlocks)
  return (
    <FormProvider form={form}>
      <form>
        <TextBox label="Name" field="name" />
        <SelectBox label="Padding" field="padding" />
        <ColorPicker label="Section Background" field="bg" />
      </form>
    </FormProvider>
  );
}
