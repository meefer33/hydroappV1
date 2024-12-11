import {Button, Title} from '@mantine/core';
import {FormProvider, useForm} from './ContextForm';
import SegmentControl from '../fields/SegmentControl';
import ColorPicker from '../fields/ColorPicker';
import TextBox from '../fields/TextBox';
import FieldsGroup from '../fields/FieldsGroup';
import {Navigate, redirect, useNavigate, useOutletContext} from '@remix-run/react';
import {buildTheme} from '../theme/lib/theme';
import useThemeUtils from '../useEditorUtils';
import {useEffect} from 'react';
import {defaultTheme, DefaultTheme} from '../theme/lib/metaTypes';
import SelectBox from '../fields/SelectBox';

export default function CreateNewTemplateForm() {
  const {themes}: any = useOutletContext();
  const {createTemplate} = useThemeUtils();
  const navigate = useNavigate();
  
  let selectThemeList = themes?.map((theme: any) => ({
    value: theme.id,
    label: theme?.fields?.name || theme?.handle,
  }));
  selectThemeList.push({value: '0', label: 'New Theme'});

  const form = useForm({
    mode: 'uncontrolled',
    //initialValues: initFormValues,
    validate: {
      name: (value) =>  (/^[A-Za-z0-9 ]+(?:-[A-Za-z0-9 ]+)*$/.test(value)) ? null : 'Template name is not a valid slug' ,
    },
  });

  const onHandleSubmit = async (values:any) => {
    const newTemplate:any = await createTemplate(values.name,values.theme)
    return navigate(`/templates/${newTemplate?.handle}`)
  };

  return (
    <FormProvider form={form}>
      <form onSubmit={form.onSubmit(onHandleSubmit)}>
        <FieldsGroup label="Create New Template" isOpen={false}>
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
