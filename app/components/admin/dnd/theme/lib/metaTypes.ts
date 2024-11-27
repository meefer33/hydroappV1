export const defaultTheme = {
    name: '',
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
  export type DefaultTheme = typeof defaultTheme

  export const defaultHeader = {
    name: '',
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
  export type DefaultHeader = typeof defaultHeader

  export const defaultSectionBlocks =  {
    name: '',
    contentWidth: 'lg',
    padding: 'xl',
    bg: '#c9c9c9',
    cols: {
      mobile: 1,
      tablet: 2,
      desktop: 4,
    },
    spacing: 'xl',
  }
  export type DefaultSectionBlocks = typeof defaultSectionBlocks

  export const defaultBlocks = {
    name: '',
    padding: 'xl',
    bg: '',
  }
  export type DefaultBlocks = typeof defaultBlocks

  export const defaultRichTextEditor = {
    name: '',
    rte: 'add text',
  }
  export type DefaultRichTextEditor = typeof defaultRichTextEditor

  export const defaultImage = {
    name: '',
    width: '100',
    image: {
      id:''
    },
  }
  export type DefaultImage= typeof defaultImage

  
  export const defaultSectionCollection = {
    name: '',
    padding: 'xl',
    bg: '',
    slides: {
      spacing: 'md',
      tablet: '50%',
      desktop: '25%',
    },
    collection: {}
  }
  export type DefaultSectionCollection = typeof defaultSectionCollection