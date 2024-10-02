import {Select} from '@mantine/core';
import {useFormContext} from '../forms/ContextForm';

export default function SelectBox({label="Choose", field, data=['none', 'sm', 'md', 'lg', 'xl']}: any) {
    const form:any = useFormContext();

  return (
    <>
      <Select
        label={label}
        placeholder="Pick value"
        data={data}
        {...form.getInputProps(field, {withFocus: false})}
        variant="filled"
        styles={{
          input: {
            background: "var(--mantine-color-gray-1)",
            color: "var(--mantine-color-gray-8)",
            border: 0,
          },
          dropdown: { background: "var(--mantine-color-gray-8)",color: "var(--mantine-color-gray-1)" },
        }}
      />
    </>
  );
}
