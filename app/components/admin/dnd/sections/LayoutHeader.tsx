import {Button, Group} from '@mantine/core';
import {buildTheme} from '../theme/themeUtils';
import Padding from '../fields/Padding';
import {FormProvider, useForm} from '../forms/ContextForm';

export default function LayoutHeader({saveLayout, layout}: any) {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: layout,
    onValuesChange: (values) => {
      saveLayout('default', form.getValues());
    },
  });

  return (
    <FormProvider form={form}>
      <form>
        <Padding label="Color Scheme" />
        <Group justify="flex-end" mt="md">
          <Button onClick={() => saveLayout('default', form.getValues())}>
            Submit
          </Button>
        </Group>
      </form>
    </FormProvider>
  );
}
