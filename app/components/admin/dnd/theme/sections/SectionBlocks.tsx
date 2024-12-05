import {Box, Container, SimpleGrid} from '@mantine/core';
import { DefaultSectionBlocks,defaultSectionBlocks } from '../lib/metaTypes';
import BlockRichText from './BlockRichText';
import BlockImage from './BlockImage';

export default function SectionBlocks({fields}:{fields:any | DefaultSectionBlocks}) {
  const display = fields?.settings || defaultSectionBlocks
  return (
    <Container fluid px={0} py={display?.padding} bg={display?.bg}>
      <Container size={display?.contentWidth}>
      <SimpleGrid
              type="container"
              cols={{
                base: display?.cols?.mobile,
                '36em': display?.cols?.tablet,
                '48em': display?.cols?.desktop,
              }}
              spacing={display?.spacing}
              //verticalSpacing={settings?.spacing}
            >
              {fields?.blocks?.map((blocks: any) => {
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
            </SimpleGrid>
      </Container>
    </Container>
  );
}

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
