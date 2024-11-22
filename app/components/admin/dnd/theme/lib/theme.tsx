import { generateColors } from "@mantine/colors-generator";
import { createTheme, DEFAULT_THEME, mergeMantineTheme } from "@mantine/core";

export const defaultTheme = {
  colorScheme: 'light',
  themes: {
    light: {
      bgColor: '#f8f9fa',
      textColor: '#3b3b3b',
    },
    dark: {
      bgColor: '#2e2e2e',
      textColor: '#c9c9c9',
    },
  },
  colors: {
    primary: '#228be6',
    accent: '#868e96',
    negative: '#fa5252',
    positive: '#40c057',
    notice: '#fab005',
    info: '#e64980',
  },
  fonts: {
    bodyClass: '',
    bodyUrl: '',
    headingsClass: '',
    headingsUrl: '',
  },
};

export const defaultLayout = {
  padding: {
    top: 'sm',
    bottom: 'sm',
    left: 'sm',
    right: 'sm',
  },
  logo: {
    image: '',
    width: '',
  },
  heading: {
    text: '',
    textSpacing: '',
    textColor: '',
    subText: '',
    subTextSpacing: '',
    subTextColor: '',
  },
  scrollMenu: {
    scrollBg: '',
  },
};

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
console.log('headings gonts',themeSettings?.fonts?.bodyClass)
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

