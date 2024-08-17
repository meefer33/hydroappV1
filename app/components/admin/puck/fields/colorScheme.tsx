import {AutoField, FieldLabel} from '@measured/puck';

export const colorscheme = (theme, updateTheme) => {
  const toUpdate = 'colorScheme';
  const config = {
    type: 'custom',
    render: ({onChange,value}) => {
      return (
        <FieldLabel label="Color Scheme">
          <AutoField
            field={{
              type: 'radio',
              options: [
                {label: 'Light', value: 'light'},
                {label: 'Dark', value: 'dark'},
                {label: 'Auto', value: 'auto'},
              ],
            }}
            onChange={(v) => {
              theme.other.colorScheme = v;
              onChange(v);
              updateTheme(theme);
            }}
            value={value }
          />
        </FieldLabel>
      );
    },
  };
  return config;
};
