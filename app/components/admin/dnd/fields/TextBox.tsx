import {TextInput} from '@mantine/core';
import {useFormContext} from '../forms/ContextForm';

export default function TextBox({label="Text Box", field}: any) {
  const form: any = useFormContext();
  return (
    <>
      <TextInput
        label={label}
        {...form.getInputProps(field)}
        styles={{
          input: {
            background: "var(--mantine-color-gray-1)",
            color: "var(--mantine-color-gray-8)",
            border: 0,
          },
        }}
      />
    </>
  );
}
