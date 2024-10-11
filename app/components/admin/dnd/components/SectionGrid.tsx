import {Box, Container, SimpleGrid} from '@mantine/core';
import DndSortableContext from '../DndSortableContext';
import Section from './Section';

export default function SectionGrid({props}: any) {
  return (
    <Section props={props}>
      <SimpleGrid
        type="container"
        cols={{base: 1, '48em': props?.content?.columns}}
        spacing={props?.content?.gap}
        verticalSpacing={props?.content?.gap}
      >
        <Box>Box</Box>
        {props?.content?.columns > 1 && <Box></Box>}
        {props?.content?.columns > 2 && <Box></Box>}
        {props?.content?.columns > 3 && <Box></Box>}
      </SimpleGrid>
    </Section>
  );
}
