import {FormProvider, useForm} from '../forms/ContextForm';
import ColorPicker from '../fields/ColorPicker';
import {nanoid} from 'nanoid';
import {useOutletContext} from '@remix-run/react';
import {useEffect} from 'react';
import SelectBox from '../fields/SelectBox';
import NumberSlider from '../fields/NumberSlider';
import {getMetaContent, loadMeta} from '../theme/themeUtils';
import TextBox from '../fields/TextBox';
import useThemeUtils from '../theme/useThemeUtils';

export const sectionProps = {
  padding: {
    top: 'sm',
    bottom: 'sm',
  },
  bgColor: 'primary',
};

export default function SectionBlocks() {
  const {item, editorContent, setEditorContent}: any =
    useOutletContext();
  const {saveMeta, saveSettings} = useThemeUtils();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      name: '',
      padding: 'xl',
      bg: 'primary',
      cols: {
        mobile: 1,
        tablet: 2,
        desktop: 4,
      },
      spacing: 'xl',
    },
    onValuesChange: async (values) => {
      const data = await saveSettings(item.id, form.getValues());
      setEditorContent(data);
    },
  });

  useEffect(() => {
    loadMeta(item.id, form);
  }, [item]);

  return (
    <FormProvider form={form}>
      {item?.fields?.settings?.name || item?.handle}
      <form name={nanoid()}>
        <TextBox label="Name" field="name" />
        <SelectBox label="Padding" field="padding" />
        <SelectBox label="Spacing" field="spacing" />
        <ColorPicker label="Section Background" field="bg" />
        <NumberSlider label="Columns Mobile" max={12} field="cols.mobile" />
        <NumberSlider label="Columns Tablet" max={12} field="cols.tablet" />
        <NumberSlider label="Columns Desktop" max={12} field="cols.desktop" />
      </form>
    </FormProvider>
  );
}
