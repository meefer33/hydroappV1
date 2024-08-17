import {
  Box,
  Button,
  ColorInput,
  ColorPicker,
  ColorSwatch,
  DEFAULT_THEME,
  Grid,
  MantineColorsTuple,
} from "@mantine/core";
import { generateColors } from "@mantine/colors-generator";
import { FieldLabel } from "@measured/puck";
import { useState } from "react";
import { useOutletContext } from "@remix-run/react";

export type ColorPickerPrimary = {
  type: string;
  label: string;
  render: ({ onChange }: any) => JSX.Element;
};

export const colorPickerPrimary = (
  label: string,
  color,
  theme,
  updateTheme,
) => {
  const config: ColorPickerPrimary = {
    type: "custom",
    label: label,
    render: ({ onChange }: any) => {
      //const theme = useMantineTheme();
      const [value, setValue] = useState(
        theme?.colors[color] ? theme?.colors[color][6] : "",
      );

      return (
        <FieldLabel label={label}>
          <ColorInput
            placeholder={label}
            //closeOnColorSwatchClick
            variant="unstyled"
            value={value}
            onChangeEnd={(value) => {
              let generatedColorsArray: any = generateColors(value);
              generatedColorsArray = generatedColorsArray.map(
                (generatedColor: any, index: number) =>
                  index === 6 ? value : generatedColor,
              );
              theme.colors[color] = generatedColorsArray;
              theme.other.themeColors[color] = value;
              updateTheme({
                ...theme,
                other: { ...theme.other },
              });
              setValue(value);
              onChange(value)
            }}
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
          {/*
          <Grid
            gutter={0}
            columns={10}
            justify="flex-start"
            align="flex-center"
            overflow="hidden"
          >
            {theme?.colors[theme.primaryColor]?.map((color) => {
              return (
                <Grid.Col key={color} span={1} py="sm">
                  <ColorSwatch size="24" radius="sm" color={color} />
                </Grid.Col>
              );
            })}
          </Grid>
          <Button color={value} fullWidth>
            {value}
          </Button>
           */}
        </FieldLabel>
      );
    },
  };
  return config;
};
