import FieldsGroup from './FieldsGroup';
import SelectBox from './SelectBox';
import ColorPicker from './ColorPicker';
import TextBox from './TextBox';

export default function SectionGroup({label = 'Section', isOpen = false}: any) {
  return (
    <FieldsGroup label={label} isOpen>
      <TextBox label="Name" field="name" />
      <SelectBox label="Content Width" field="contentWidth" />
      <SelectBox label="Padding" field="padding" />
      <SelectBox label="Spacing" field="spacing" />
      <ColorPicker label="Section Background" field="bg" />
    </FieldsGroup>
  );
}
