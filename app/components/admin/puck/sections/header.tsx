import {TypographyStylesProvider} from '@mantine/core';
import {imagePicker} from '../fields/imagePicker';
import {padding} from '../fields/padding';
import ThemeHeader from '../theme/ThemeHeader';
import { colorPicker } from '../fields/colorPicker';

export const header = (theme:any = {}) => {
  const config = {
    fields: {
      padding: padding(),
      logo: {
        type: 'object',
        label: 'Logo',
        objectFields: {
          logoImage: imagePicker('Logo'),
          logoWidth: {
            label: "Logo Width",
            type:"number"
          },
          logoText: {
            label: "Logo Text",
            type:"text"
          },
          logoTextSpacing: {
            label: "Logo Text Spacing",
            type:"number"
          },
          logoColor: colorPicker('Logo Text Color',theme),
          logoSubText: {
            label: "Logo Text",
            type:"text"
          },
          logoSubTextColor: colorPicker('Logo Sub Text Color',theme),
        },
      },
      scrollBackground: colorPicker('Scroll Background Color',theme),
    },
    defaultProps: {
      padding: {
        padding_top: 'none',
        padding_bottom: 'none',
      },
      logo: {
        logoImage: '',
      },
    },
    render: ({...props}) => {
      console.log(props);

      return <ThemeHeader {...props} />;
    },
  };
  return config;
};
