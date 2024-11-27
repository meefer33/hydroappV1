import {useOutletContext} from '@remix-run/react';
import SectionBlocksForm from './SectionBlocksForm';
import {Box} from '@mantine/core';
import Blocks from './BlocksForm';
import ImageForm from './ImageForm';
import RichTextBlock from './RichTextBlockForm';
import SectionCollection from './SectionCollectionForm';
import HeaderDefaultForm from './HeaderDefaultForm';

export default function ShowForm() {
  const {item}: any = useOutletContext();
  const getForm = (type: any) => {
    switch (type) {
      case 'section_blocks':
        return <SectionBlocksForm />;
      case 'blocks':
        return <Blocks />;
      case 'block_image':
        return <ImageForm />;
      case 'block_rich_text':
        return <RichTextBlock />;
      case 'section_collection':
        return <SectionCollection />;
      case 'headers':
        return <HeaderDefaultForm />;
      default:
        return null;
    }
  };

  return <Box>{getForm(item?.type)}</Box>;
}
