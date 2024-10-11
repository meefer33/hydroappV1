import {Select,Box} from '@mantine/core';
import {useFormContext} from '../forms/ContextForm';

export default function SelectBox({label="Choose", field, data=['0', 'sm', 'md', 'lg', 'xl']}: any) {
    const form:any = useFormContext();

  return (
  
      <Select
        label={label}
        placeholder="Pick value"
        data={data}
        {...form.getInputProps(field)}
        variant="filled"
        inputSize="sm"
        size="sm"
        styles={{
          input: {
            background: "var(--mantine-color-gray-1)",
            color: "var(--mantine-color-gray-8)",
            border: 0,
          },
          dropdown: { background: "var(--mantine-color-gray-8)",color: "var(--mantine-color-gray-1)" },
        }}
      />

  );
}
