import {useOutletContext} from '@remix-run/react';
import HeaderDefaultForm from './HeaderDefaultForm';
import SectionBlocksForm from './SectionBlocksForm';
import BlocksForm from './BlocksForm';
import ImageForm from './ImageForm';
import RichTextBlockForm from './RichTextBlockForm';
import SectionCollection from './SectionCollectionForm';

export default function ShowForm() {
  const {item}: any = useOutletContext();
  const getForm = (type: any) => {
    switch (type) {
      case 'section_blocks':
        return <SectionBlocksForm />;
      case 'blocks':
        return <BlocksForm />;
      case 'block_image':
        return <ImageForm />;
      case 'block_rich_text':
        return <RichTextBlockForm />;
      case 'section_collection':
        return <SectionCollection />;
      case 'headers':
        return <HeaderDefaultForm />;
      default:
        return null;
    }
  };

  return getForm(item?.type);
}
