import {Container} from '@mantine/core';
import { DefaultSectionBlocks,defaultSectionBlocks } from '../lib/metaTypes';

export default function SectionBlocks({settings, children}:{settings:DefaultSectionBlocks,children:any}) {
  const display = settings || defaultSectionBlocks
  return (
    <Container fluid px={0} py={display?.padding} bg={display?.bg}>
      <Container size={display?.contentWidth}>{children}</Container>
    </Container>
  );
}
