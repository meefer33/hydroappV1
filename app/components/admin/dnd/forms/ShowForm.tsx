import {useOutletContext} from '@remix-run/react';
import SectionBlocks from './SectionBlocks';
import {Box} from '@mantine/core';
import Blocks from './Blocks';
import ImageForm from './ImageForm';
import RichTextBlock from './RichTextBlock';
import SectionCollection from './SectionCollection';
import LayoutGrid from './LayoutGrid';
import HeaderDefaultForm from './HeaderDefaultForm';

export default function ShowForm() {
  const {item}: any = useOutletContext();
  const getForm = (type: any) => {
    switch (type) {
      case 'grids':
        return <LayoutGrid />;
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
      case 'headers':
        return <HeaderDefaultForm />;
      default:
        return null;
    }
  };

  return <Box>{getForm(item?.type)}</Box>;
}
