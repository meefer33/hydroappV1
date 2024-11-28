import NumberSlider from '../fields/NumberSlider';
import SectionGroup from '../fields/SectionGroup';
import FieldsGroup from '../fields/FieldsGroup';
import {FormProvider} from './ContextForm';
import useThemeUtils from '../useEditorUtils';
import { defaultSectionBlocks } from '../theme/lib/metaTypes';

export default function SectionBlocksForm() {
  const {getForm} = useThemeUtils();
  const form = getForm(defaultSectionBlocks)
  return (
    <FormProvider form={form}>
      <form>
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
