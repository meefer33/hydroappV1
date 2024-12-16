import {Button} from '@mantine/core';
import {FormProvider, useForm} from './ContextForm';
import TextBox from '../fields/TextBox';
import FieldsGroup from '../fields/FieldsGroup';
import {useOutletContext} from '@remix-run/react';
import useThemeUtils from '../useEditorUtils';
import SelectBox from '../fields/SelectBox';
import { useEffect } from 'react';

export default function EditTemplateFormEditor() {
  const {themes, templates, setTemplates, metaData, closeModal,theme, setTheme,template,setTemplate}: any =
    useOutletContext();
  const {saveContent} = useThemeUtils();

  let selectThemeList = themes?.map((theme: any) => ({
    value: theme.id,
    label: theme?.fields?.name || theme?.handle,
  }));

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      name: template?.fields?.name,
      theme: template?.fields?.theme?.id,
    },
    validate: {
      name: (value) =>
        /^[A-Za-z0-9 ]+(?:-[A-Za-z0-9 ]+)*$/.test(value)
          ? null
          : 'Template name is not a valid slug',
    },
  });

  const onHandleSubmit = async (values: any) => {
    const updateTemplate = await saveContent(template?.id, {
      fields: [
        {
          key: 'name',
          value: values.name,
        },
        {
          key: 'theme',
          value: values.theme,
        },
      ],
    });
   console.log('updateTemplate',updateTemplate)
   setTemplate(updateTemplate)
  };

  return (
    <FormProvider form={form}>
      <form onSubmit={form.onSubmit(onHandleSubmit)}>
        <FieldsGroup label="Edit Template" isOpen={true}>
          <TextBox label="Template Name" field="name" />
          <SelectBox
            label="Select Theme"
            field="theme"
            data={selectThemeList}
          />
          <Button type="submit" color="gray.7">
            Submit
          </Button>
        </FieldsGroup>
      </form>
    </FormProvider>
  );
}


