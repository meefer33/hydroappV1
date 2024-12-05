import {useOutletContext} from '@remix-run/react';
import SelectBox from '../fields/SelectBox';
import useThemeUtils from '../useEditorUtils';
import {FormProvider, useForm} from './ContextForm';
import {nanoid} from 'nanoid';

export default function ChooseTemplateForm({pageId}) {
  const {templates, setPage, page}: any = useOutletContext();
  const {saveContent} = useThemeUtils();

  const selectTemplateList = templates?.map((template: any) => ({
    value: template.id,
    label: template?.fields?.name || template?.handle,
  }));

  const form = useForm({
    mode: 'controlled',
    initialValues: {template: page?.fields?.template?.id},
    onValuesChange: async (values: any) => {
      //if (values.template) {
        const data = await saveContent(pageId, {
          fields: [
            {
              key: 'template',
              value: values.template || '',
            },
          ],
        });
        console.log('data temp',data)
        setPage(data);
      //}
    },
  });

  return (
    <FormProvider form={form}>
      <form name={nanoid()}>
        <SelectBox
          label="Select Template"
          field="template"
          data={selectTemplateList}
        />
      </form>
    </FormProvider>
  );
}
