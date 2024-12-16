import {Title} from '@mantine/core';
import {FormProvider, useForm} from './ContextForm';
import SegmentControl from '../fields/SegmentControl';
import ColorPicker from '../fields/ColorPicker';
import TextBox from '../fields/TextBox';
import FieldsGroup from '../fields/FieldsGroup';
import {useOutletContext} from '@remix-run/react';
import {buildTheme} from '../theme/lib/theme';
import useThemeUtils from '../useEditorUtils';
import {useEffect} from 'react';
import { defaultTheme, DefaultTheme } from '../theme/lib/metaTypes';
import { nanoid } from 'nanoid';

export default function ThemeFormTemplate() {
  const {setTheme,theme,template}: any = useOutletContext();
  const {saveMeta} = useThemeUtils();
  console.log('teg',template)
  const tempMeta = template?.fields?.theme?.fields?.theme
  const initFormValues:DefaultTheme = {
    ...tempMeta,
    name:
    tempMeta.name || template?.fields?.theme?.handle,
  }

  const form = useForm({
    mode: 'controlled',
    initialValues: initFormValues,
    onValuesChange: (values:DefaultTheme) => {
      setTheme(buildTheme(values));
      saveMeta(theme?.id, {
        fields: [
          {
            key: 'name',
            value: values.name,
          },
          {
            key: 'theme',
            value: JSON.stringify(values),
          },
        ],
      });
    },
  });

  useEffect(()=>{
    console.log('ue',template)
    form.setValues(template?.fields?.theme?.fields?.theme)
  },[template])

  return (
    <FormProvider form={form}>
      <form name={nanoid()}>
        <FieldsGroup label="Theme" isOpen={true}>
          <TextBox label="Name" field="name" />
          <FieldsGroup label="Colors" isOpen={true}>
            <SegmentControl
              label="Color Scheme"
              field="colorScheme"
              data={[
                {label: 'Light', value: 'light'},
                {label: 'Dark', value: 'dark'},
              ]}
            />
            <ColorPicker
              label="Light Background"
              field="themes.light.bgColor"
            />
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
          <FieldsGroup label="Fonts" isOpen={false}>
            <TextBox label="Body Class" field="fonts.bodyClass" />
            <TextBox label="Body Url" field="fonts.bodyUrl" />
            <TextBox label="Headings Class" field="fonts.headingsClass" />
            <TextBox label="Headings Url" field="fonts.headingsUrl" />
          </FieldsGroup>
        </FieldsGroup>
      </form>
    </FormProvider>
  );
}