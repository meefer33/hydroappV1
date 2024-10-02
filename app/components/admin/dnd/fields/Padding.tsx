import {useFormContext} from '../forms/ContextForm';
import FieldsGroup from './FieldsGroup';
import SelectBox from './SelectBox';

export default function Padding({label = 'Padding'}: any) {
  const form: any = useFormContext();

  return (
    <FieldsGroup label={label}>
      <SelectBox label="Top" field="padding.top" />
      <SelectBox label="Bottom" field="padding.bottom" />
      <SelectBox label="Left" field="padding.left" />
      <SelectBox label="Right" field="padding.right" />
    </FieldsGroup>
  );
}
