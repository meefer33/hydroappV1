import {ColorInput, DEFAULT_THEME} from '@mantine/core';

import {useFormContext} from '../forms/ContextForm';

export default function ColorPicker({
  label,
  field,
  section
}: any) {
  const form: any = useFormContext();
  
  return (
    <ColorInput
      variant="unstyled"
      label={label}
      {...form.getInputProps(field, {withFocus: true})}
      //value={section?.data?.bgColor}
      placeholder={label}
      closeOnColorSwatchClick
      //defaultValue={theme?.colors[color] ? theme?.colors[color][6] : ''}
      fixOnBlur={true}
      withPicker={true}
      withEyeDropper={false}
      swatchesPerRow={10}
      swatches={[
        DEFAULT_THEME.colors.gray[6],
        DEFAULT_THEME.colors.dark[6],
        DEFAULT_THEME.colors.blue[6],
        DEFAULT_THEME.colors.cyan[6],
        DEFAULT_THEME.colors.indigo[6],
        DEFAULT_THEME.colors.green[6],
        DEFAULT_THEME.colors.teal[6],
        DEFAULT_THEME.colors.lime[6],
        DEFAULT_THEME.colors.red[6],
        DEFAULT_THEME.colors.pink[6],
        DEFAULT_THEME.colors.orange[6],
        DEFAULT_THEME.colors.yellow[6],
        DEFAULT_THEME.colors.grape[6],
        DEFAULT_THEME.colors.violet[6],
      ]}
      styles={{
        input: {
          background: "var(--mantine-color-gray-2)",
          color: "var(--mantine-color-gray-8)",
          border: 0,
        },
        dropdown: { background: "#000000" },
      }}
    />
  );
}
