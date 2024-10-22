import {useOutletContext} from '@remix-run/react';
import SectionBlocks from './SectionBlocks';
import {Box} from '@mantine/core';
import Blocks from './Blocks';
import ImageForm from './ImageForm';
import RichTextBlock from './RichTextBlock';
import SectionCollection from './SectionCollection';

export default function ShowForm() {
  const {item}: any = useOutletContext();
  //console.log('item',item)
  const getForm = (type: any) => {
    switch (type) {
      case 'section_blocks':
        return <SectionBlocks />;
      case 'blocks':
        return <Blocks />;
      case 'block_image':
        return <ImageForm />;
      case 'block_rich_text':
        return <RichTextBlock />;
      case 'section_collection':
        return <SectionCollection />;
      default:
        return null;
    }
  };

  return <Box>{getForm(item?.type)}</Box>;
}
