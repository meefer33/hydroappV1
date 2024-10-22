import {Title} from '@mantine/core';
import {FormProvider, useForm} from './ContextForm';
import SegmentControl from '../fields/SegmentControl';
import ColorPicker from '../fields/ColorPicker';
import TextBox from '../fields/TextBox';
import FieldsGroup from '../fields/FieldsGroup';
import {useOutletContext} from '@remix-run/react';
import { buildTheme } from '../theme/lib/theme';

export default function ThemeForm() {
  const {saveTheme, setTheme, themes}: any = useOutletContext();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: themes[0]?.fields?.theme,
    onValuesChange: (values) => {
      setTheme(buildTheme(form.getValues()));
      saveTheme('default', form.getValues());
    },
  });

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
          <TextBox label="Body Class" field="fonts.bodyClass" />
          <TextBox label="Body Url" field="fonts.bodyUrl" />
          <TextBox label="Headings Class" field="fonts.headingsClass" />
          <TextBox label="Headings Url" field="fonts.headingsUrl" />
        </FieldsGroup>
      </form>
    </FormProvider>
  );
}
