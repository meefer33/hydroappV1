import {Container} from '@mantine/core';
import DndSortableContext from '../SortableContext';
import { nanoid } from 'nanoid';
import { useListState } from '@mantine/hooks';

export default function Section({
  padding_top = 'sm',
  padding_bottom = 'sm',
  bg_color = 'primary',
  data = {}
}:any) {
  const dataa = {
    type: 'Section',
    fields: {},
  };
console.log('sectiondata',data)
  return (
    <Container fluid px={0} pt={data.padding.top} pb={data.padding.bottom} bg={data.bg_color}>
      Section item
    </Container>
  );
}
