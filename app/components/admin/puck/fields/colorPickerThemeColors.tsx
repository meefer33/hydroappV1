import {ColorInput} from '@mantine/core';
import {FieldLabel} from '@measured/puck';
import {useState} from 'react';
import {getSwatches} from '../utils';

export const colorPickerThemeColors = (label: any, theme) => {
  const config = {
    type: 'custom',
    label: label,
    render: ({onChange,value}: any) => {
      //const [value, setValue] = useState('');
      const themeColor = theme.other.themeColors
      return (
        <FieldLabel label={label}>
          <ColorInput
            closeOnColorSwatchClick
            variant="filled"
            withPicker={true}
            withEyeDropper={false}
            placeholder="color"
            swatchesPerRow={11}
            swatches={[themeColor.primary,themeColor.accent,themeColor.negative,themeColor.positive,themeColor.notice,themeColor.info]}
            value={value}
            onChangeEnd={(color) => {
              //setValue(value);
              onChange(color);
            }}
            styles={{
              input: {
                background: 'var(--mantine-color-gray-2)',
                color: 'var(--mantine-color-gray-8)',
                border: 0,
              },
              dropdown: {background: '#000000'},
            }}
          />
        </FieldLabel>
      );
    },
  };
  return config;
};
