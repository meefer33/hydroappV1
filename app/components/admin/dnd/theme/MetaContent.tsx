import {Box} from '@mantine/core';
import SectionBlocks from './sections/SectionBlocks';
import SectionCollectionDisplay from './sections/SectionCollectionDisplay';
import BlockRichText from './sections/BlockRichText';
import BlockImage from './sections/BlockImage';


export default function MetaContentEditor({content}: any) {
  const getType = (item: any) => {
    switch (item.type) {
      case 'section_blocks':
        return (
          <SectionBlocks content={item}>
            {item?.map((blocks: any) => {
              const settings = blocks?.fields?.settings;
              const items = blocks?.fields?.block_items;
              return (
                <Box key={blocks.id} bg={settings?.bg} p="sm">
                  {items?.map((block: any) => {
                    return getTypeBlock(block);
                  })}
                </Box>
              );
            })}
          </SectionBlocks>
        );
      case 'section_collection':
        return <SectionCollectionDisplay content={item} />;
      default:
        return <></>;
    }
  };

  const getTypeBlock = (block: any) => {
    switch (block.type) {
      case 'block_rich_text':
        return <BlockRichText key={block.id} content={block} />;
      case 'block_image':
        return <BlockImage key={block.id} content={block} />;
      default:
        return <></>;
    }
  };

  return (
    <>
      {content?.map((item: any) => {
        return <Box key={item.id}>{getType(item)}</Box>;
      })}
    </>
  );
}
