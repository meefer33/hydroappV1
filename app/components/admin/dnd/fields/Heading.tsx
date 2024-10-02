import {useFormContext} from '../forms/ContextForm';
import ColorPicker from './ColorPicker';
import NumberSlider from './NumberSlider';
import TextBox from './TextBox';
import FieldsGroup from './FieldsGroup';

export default function Heading({label = 'Heading'}: any) {
  const form: any = useFormContext();

  return (
    <FieldsGroup label={label}>
      <TextBox label="Text" field="heading.text" />
      <NumberSlider label="Text Spacing" field="heading.textSpacing" />
      <ColorPicker label="Text Color" field="heading.textColor" />
      <TextBox label="Sub Text" field="heading.subText" />
      <NumberSlider label={'Sub Text Spacing'} field="heading.subTextSpacing" />

      <ColorPicker label="Sub Text Color" field="heading.subTextColor" />
    </FieldsGroup>
  );
}
