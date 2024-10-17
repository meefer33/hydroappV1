import {Box, Container, SimpleGrid} from '@mantine/core';
import BlockRichText from './BlockRichText';
import BlockImage from './BlockImage';

export default function SectionBlocks({content}: any) {
  const settings = content.fields.settings;
  
  const getType = (block: any) => {
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
    <Container fluid px={0} py={settings?.padding} bg={settings?.bg}>
      <Container size="xl
      ">
        <SimpleGrid
          type="container"
          cols={{
            base: settings?.cols?.mobile,
            '20em': settings?.cols?.tablet,
            '48em': settings?.cols?.desktop,
          }}
          spacing={settings?.spacing}
          //verticalSpacing={settings?.spacing}
        >
          {content?.fields?.blocks?.map((blocks: any) => {
            return (
              <Box key={blocks.id} bg={blocks?.fields?.settings?.bg} p="sm">
                {blocks?.fields?.blocks?.map((block: any) => {
                  return getType(block);
                })}
              </Box>
            );
          })}
        </SimpleGrid>
      </Container>
    </Container>
  );
}
