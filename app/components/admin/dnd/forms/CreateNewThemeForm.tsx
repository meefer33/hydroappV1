import {Button} from '@mantine/core';
import {FormProvider, useForm} from './ContextForm';
import TextBox from '../fields/TextBox';
import FieldsGroup from '../fields/FieldsGroup';
import {useNavigate, useOutletContext} from '@remix-run/react';
import useThemeUtils from '../useEditorUtils';

export default function CreateNewThemeForm() {
  const {themes, setThemes}: any = useOutletContext();
  const {createTheme} = useThemeUtils();
  const navigate = useNavigate();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues:{
      name: ''
    },
    validate: {
      name: (value) =>
        /^[A-Za-z0-9 ]+(?:-[A-Za-z0-9 ]+)*$/.test(value)
          ? null
          : 'Template name is not a valid slug',
    },
  });

  const onHandleSubmit = async (values: any) => {
    const newTheme: any = await createTheme(values.name);
    form.reset();
  };

  return (
    <FormProvider form={form}>
      <form onSubmit={form.onSubmit(onHandleSubmit)}>
        <FieldsGroup label="Create New Theme" isOpen={false}>
          <TextBox label="Theme Name" field="name" />
          <Button type="submit" color="gray.7">
            Submit
          </Button>
        </FieldsGroup>
      </form>
    </FormProvider>
  );
}
