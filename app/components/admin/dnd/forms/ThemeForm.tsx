import {Title} from '@mantine/core';
import {FormProvider, useForm} from './ContextForm';
import SegmentControl from '../fields/SegmentControl';
import ColorPicker from '../fields/ColorPicker';
import {buildTheme} from '../theme/themeUtils';
import TextBox from '../fields/TextBox';
import FieldsGroup from '../fields/FieldsGroup';

export default function ThemeForm({theme, setTheme, saveTheme, config}: any) {
  //console.log('tf', theme, theme?.other?.colors?.primary);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: config,
    onValuesChange: (values) => {
      setTheme(buildTheme(form.getValues()));
      saveTheme('default', form.getValues());
    },
  });

  const nt = [
    {
      type: 'SegmentControl',
      label: 'Color Scheme',
      field: 'colorScheme',
      default: 'light',
    },
    {
      type: 'group',
      name: 'themes',
      items: [
        {
          type: 'group',
          name: 'light',
          items: [
            {
              type: 'colorPicker',
              label: 'Background Color',
              field: 'bgColor',
              default: '#f8f9fa',
            },
          ],
        },
        {
          type: 'group',
          name: 'dark',
          items: [
            {
              type: 'colorPicker',
              label: 'Background Color',
              field: 'bgColor',
              default: '#f8f9fa',
            },
          ],
        },
      ],
    },
  ];

  return (
    <FormProvider form={form}>
      <form>
        <FieldsGroup label="Colors">
          <SegmentControl
            label="Color Scheme"
            field="colorScheme"
            data={[
              {label: 'Light', value: 'light'},
              {label: 'Dark', value: 'dark'},
            ]}
          />
          <ColorPicker label="Light Background" field="themes.light.bgColor" />
          <ColorPicker label="Light Text" field="themes.light.textColor" />
          <ColorPicker label="Dark Background" field="themes.dark.bgColor" />
          <ColorPicker label="Dark Text" field="themes.dark.textColor" />
          <Title order={4}>Theme Colors</Title>
          <ColorPicker label="Primary" field="colors.primary" />
          <ColorPicker label="Accent" field="colors.accent" />
          <ColorPicker label="Negative" field="colors.negative" />
          <ColorPicker label="Positive" field="colors.positive" />
          <ColorPicker label="Notice" field="colors.notice" />
          <ColorPicker label="Info" field="colors.info" />
        </FieldsGroup>
        <FieldsGroup label="Fonts">
          <TextBox label="Top" field="fonts.bodyClass" />
          <TextBox label="Bottom" field="fonts.bodyUrl" />
          <TextBox label="Left" field="fonts.headingsClass" />
          <TextBox label="Right" field="fonts.headingsUrl" />
        </FieldsGroup>
      </form>
    </FormProvider>
  );
}
