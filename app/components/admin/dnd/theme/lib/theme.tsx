import { generateColors } from "@mantine/colors-generator";
import { createTheme, DEFAULT_THEME, mergeMantineTheme } from "@mantine/core";
import { defaultTheme } from "./metaTypes";

export const buildTheme = (themeSettings: any = defaultTheme) => {
  //generate colors
  let newColors: any = {};
  for (const [key, value] of Object.entries<any>(themeSettings?.colors)) {
    let generatedColorsArray: any = generateColors(value);
    generatedColorsArray = generatedColorsArray.map(
      (generatedColor: any, index: number) =>
        index === 6 ? value : generatedColor,
    );
    newColors[key] = generatedColorsArray;
  }

  const newTheme = createTheme({
    primaryColor: 'primary',
    colors: newColors,
    //fontFamily: themeSettings?.fonts?.bodyClass || DEFAULT_THEME.fontFamily,

    other: themeSettings,
  });
  const mt = mergeMantineTheme(DEFAULT_THEME, newTheme);
  return mt;
};

export const getCssResolve = (theme: any) => {
  const cssResolve = {
    variables: {
      '--mantine-color-body':
        theme?.colorScheme === 'dark'
          ? theme?.themes?.dark?.bgColor
          : theme?.themes?.light?.bgColor,
      '--mantine-color-text':
        theme.colorScheme === 'dark'
          ? theme?.themes?.dark?.textColor
          : theme?.themes?.light?.textColor,
      '--divider-color':
        theme?.colorScheme === 'dark'
          ? '--mantine-color-dark-4'
          : '--mantine-color-dark-4',
    },
    light: {
      '--mantine-color-body':
        theme?.themes?.light?.bgColor,
      '--mantine-color-text':
        theme?.themes?.light?.textColor,
    },
    dark: {
      '--mantine-color-body': theme?.themes?.dark?.bgColor,
      '--mantine-color-text':
        theme?.themes?.dark?.textColor,
    },
  };
  return cssResolve;
};

