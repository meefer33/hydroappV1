import {useForm} from './ContextForm';
import {useOutletContext} from '@remix-run/react';
import useThemeUtils from '../useEditorUtils';
import {useEffect} from 'react';
import HeaderDefaultForm from './HeaderDefaultForm';
import SectionCollection from './SectionCollectionForm';
import RichTextBlockForm from './RichTextBlockForm';
import ImageForm from './ImageForm';
import BlocksForm from './BlocksForm';
import SectionBlocksForm from './SectionBlocksForm';


export default function DefaultForm({initFormValues}) {
  const {item, setEditorContent}: any = useOutletContext();
  const {saveMeta} = useThemeUtils();

  const form = useForm({
    mode: 'controlled',
    initialValues: item?.fields?.settings || initFormValues,
    onValuesChange: async (values: any) => {
      const data = await saveMeta(item.id, {
        fields: [
          {
            key: 'name',
            value: values.name,
          },
          {
            key: 'settings',
            value: JSON.stringify(values),
          },
        ],
      });
      setEditorContent(data);
    },
  });

  useEffect(() => {
    form.setFieldValue('name', item?.fields?.name || item?.handle);
  }, [item.id]);

  const getForm = (type: any) => {
    switch (type) {
      case 'section_blocks':
        return <SectionBlocksForm form={form} />;
      case 'blocks':
        return <BlocksForm form={form} />;
      case 'block_image':
        return <ImageForm form={form} />;
      case 'block_rich_text':
        return <RichTextBlockForm form={form} />;
      case 'section_collection':
        return <SectionCollection form={form} />;
      case 'headers':
        return <HeaderDefaultForm form={form} />;
      default:
        return null;
    }
  };

  return getForm(item?.type);
}


