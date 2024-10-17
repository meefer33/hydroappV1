import {Box, Container, SimpleGrid} from '@mantine/core';
import {RichText} from '@shopify/hydrogen';

export default function BlockRichText({content}: any) {
  return <RichText data={content?.fields?.text} />;
}
