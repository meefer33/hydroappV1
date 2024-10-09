import {Box, Container, SimpleGrid} from '@mantine/core';
import DndSortableContext from '../DndSortableContext';

export const sectionProps = {
  fields: {
    section_background: '',
    padding: {
      type: 'object',
      label: 'Padding',
      objectFields: {
        padding_top: {
          type: 'select',
          label: 'Top',
          options: [
            {label: 'none', value: '0'},
            {label: 'small', value: 'sm'},
            {label: 'medium', value: 'md'},
            {label: 'large', value: 'lg'},
          ],
        },
        padding_bottom: {
          type: 'select',
          label: 'Bottom',
          options: [
            {label: 'none', value: '0'},
            {label: 'small', value: 'sm'},
            {label: 'medium', value: 'md'},
            {label: 'large', value: 'lg'},
          ],
        },
      },
    },
    content: {
      type: 'object',
      label: 'Content',
      objectFields: {
        width: {
          type: 'select',
          label: 'Width',
          options: [
            {label: 'small', value: 'sm'},
            {label: 'medium', value: 'md'},
            {label: 'large', value: 'lg'},
            {label: 'extra large', value: 'xl'},
          ],
        },
        columns: {
          type: 'select',
          label: 'Columns',
          options: [
            {label: '1', value: 1},
            {label: '2', value: 2},
            {label: '3', value: 3},
            {label: '4', value: 4},
          ],
        },
        gap: {
          type: 'select',
          label: 'Column Spacing',
          options: [
            {label: 'sm', value: 'sm'},
            {label: 'md', value: 'md'},
            {label: 'lg', value: 'lg'},
            {label: 'xl', value: 'xl'},
          ],
        },
      },
    },
  },
};

export default function SectionGrid({props}: any) {
  return (
    <Container size={props?.content?.width} bg={props.section_background}>
      <SimpleGrid
        type="container"
        cols={{base: 1, '48em': props?.content?.columns}}
        spacing={props?.content?.gap}
        verticalSpacing={props?.content?.gap}
        pt={props?.padding?.padding_top}
        pb={props?.padding?.padding_bottom}
      >
        <DndSortableContext />
        {props?.content?.columns > 1 && <DndSortableContext />}
        {props?.content?.columns > 2 && <DndSortableContext />}
        {props?.content?.columns > 3 && <DndSortableContext />}
      </SimpleGrid>
    </Container>
  );
}
