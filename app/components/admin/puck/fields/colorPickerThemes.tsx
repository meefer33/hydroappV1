import { ColorInput } from "@mantine/core";
import { FieldLabel } from "@measured/puck";
import { useState } from "react";
import { getSwatches } from "../utils";


export const colorPickerThemes = (
  label: any,
  themeName,
  fieldName,
  theme,
  updateTheme,
) => {
  const [value, setValue] = useState(theme?.other?.themes[themeName][fieldName]);

  const config = {
    type: "custom",
    label: label,
    render: ({ onChange }: any) => {
      return (
        <FieldLabel label={label}>
          <ColorInput
            closeOnColorSwatchClick
            placeholder={label}
            withPicker={false}
            withEyeDropper={false}
            swatchesPerRow={11}
            swatches={getSwatches(theme.colors)}
            value={value}
            //fixOnBlur={false}
            onChangeEnd={(color) => {
          
              let setColor = theme.other;
              theme.other["themes"][themeName][fieldName] = color;
              updateTheme(theme);
              onChange(color);
              setValue(color);
            }}
            styles={{
              input: {
                background: "var(--mantine-color-gray-2)",
                color: "var(--mantine-color-gray-8)",
                border: 0,
              },
              dropdown: { background: "#000000" },
            }}
          />
        </FieldLabel>
      );
    },
  };
  return config;
};
