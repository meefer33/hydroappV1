import {Button, ColorInput} from '@mantine/core';
import {FieldLabel} from '@measured/puck';
import {useState} from 'react';
import {getSwatches} from '../utils';

export const colorPicker = (label: any, theme) => {
  const config = {
    type: 'custom',
    label: label,
    render: ({onChange,value}: any) => {
      const [cvalue, setCvalue] = useState(value);
      const clear = () => {
        onChange('')
        setCvalue('')
      }
      return (
        <FieldLabel label={label}>
          <ColorInput
            closeOnColorSwatchClick
            variant="filled"
            withPicker={false}
            withEyeDropper={false}
            placeholder="background color"
            swatchesPerRow={11}
            swatches={getSwatches(theme.colors)}
            value={cvalue}
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
          <Button variant="transparent" onClick={()=>clear()}>Clear</Button>
        </FieldLabel>
      );
    },
  };
  return config;
};
