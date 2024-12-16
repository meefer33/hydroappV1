import {Button} from '@mantine/core';
import {FormProvider, useForm} from './ContextForm';
import TextBox from '../fields/TextBox';
import FieldsGroup from '../fields/FieldsGroup';
import {useNavigate, useOutletContext} from '@remix-run/react';
import useThemeUtils from '../useEditorUtils';

export default function EditThemeFormAdmin() {
  const {themes, setThemes, metaData,closeModal}: any = useOutletContext();
  const {saveContent} = useThemeUtils();
  const navigate = useNavigate();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      name: metaData?.fields.name,
    },
    validate: {
      name: (value) =>
        /^[A-Za-z0-9 ]+(?:-[A-Za-z0-9 ]+)*$/.test(value)
          ? null
          : 'Template name is not a valid slug',
    },
  });

  const onHandleSubmit = async (values: any) => {
    const updateTheme = await saveContent(metaData?.id, {
      fields: [
        {
          key: 'name',
          value: values.name,
        },
      ],
    });
    const newThemes = themes.map((theme)=>{
      if(theme.id === metaData?.id){
        return updateTheme
      }
      return theme
    })
    setThemes([...newThemes]);
    closeModal();
  };

  return (
    <FormProvider form={form}>
      <form onSubmit={form.onSubmit(onHandleSubmit)}>
        <FieldsGroup label="Edit Theme" isOpen={true}>
          <TextBox label="Theme Name" field="name" />
          <Button type="submit" color="gray.7">
            Submit
          </Button>
        </FieldsGroup>
      </form>
    </FormProvider>
  );
}
