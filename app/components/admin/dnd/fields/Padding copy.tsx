import {useFormContext} from '../forms/ContextForm';
import FieldsGroup from './FieldsGroup';
import SelectBox from './SelectBox';

export default function Padding({label = 'Padding',isOpen=false}: any) {
  const form: any = useFormContext();

  return (
    <FieldsGroup label={label} isOpen={isOpen}>
      <SelectBox label="Top" field="padding.top" />
      <SelectBox label="Bottom" field="padding.bottom" />
      <SelectBox label="Left" field="padding.left" />
      <SelectBox label="Right" field="padding.right" />
    </FieldsGroup>
  );
}
