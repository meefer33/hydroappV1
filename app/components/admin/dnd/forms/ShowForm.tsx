import { useOutletContext } from '@remix-run/react';
import SectionBlocks from './SectionBlocks';
import { Box } from '@mantine/core';
import Blocks from './Blocks';

export default function ShowForm() {
  const {item}: any = useOutletContext();
//console.log('item',item)
  const getForm = (type: any) => {
    switch (type) {
      case 'section_blocks':
        return <SectionBlocks />;
        case 'blocks':
          return <Blocks />;
      default:
        return null;
    }
  };

  return <Box p="xs">{getForm(item?.type)}</Box>
}
