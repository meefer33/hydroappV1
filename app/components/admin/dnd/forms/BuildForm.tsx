import {
  Button,
  Checkbox,
  Group,
  NativeSelect,
  SegmentedControl,
  Select,
  TextInput,
} from '@mantine/core';
//import {useForm, createFormContext } from '@mantine/form';

import {FormProvider, useForm} from './ContextForm';
import SegmentControl from '../fields/SegmentControl';
import ColorPickerPrimary from '../fields/ColorPicker';
import {useListState} from '@mantine/hooks';
import {buildTheme} from '../theme/themeUtils';
import {useFetcher} from '@remix-run/react';

export default function LayoutForm({theme, setTheme, saveTheme}: any) {
  console.log('tf', theme, theme?.other?.colors?.primary);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
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
    },
  });

  const handleOnChangeForm = () => {
    console.log('wtf', form.getValues());
    setTheme(buildTheme(form.getValues()));
  };

  return (
    <FormProvider form={form}>
      <form onChange={() => handleOnChangeForm()}>
        <SegmentControl label="Color Scheme" field="colorScheme" />
        <ColorPickerPrimary
          label="Primary Color"
          field="colors.primary"
          handleOnChangeForm={handleOnChangeForm}
        />
        <Group justify="flex-end" mt="md">
          <Button onClick={() => saveTheme('default', theme)}>Submit</Button>
        </Group>
      </form>
    </FormProvider>
  );
}
