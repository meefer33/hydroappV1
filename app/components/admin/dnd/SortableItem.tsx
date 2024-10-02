import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Box, Button} from '@mantine/core';
import Section from './components/Section';

export default function SortableItem({id, type, data, selectedItem, setSelectedItem}: any) {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({id});

  const getType = (type: any, data: any) => {
    switch (type) {
      case 'section':
        return <Section data={data} />;
      default:
        return null;
    }
  };

  return (
    <Box
    >
      <Button {...attributes} {...listeners} color="gray.9">
        Move
      </Button>
      <Box
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
          border: '1px solid black',
          opacity: isDragging ? 0.5 : 1,
        }}
        onClick={()=>{
          console.log('clicked',id,data)
          setSelectedItem(id)
        
        }}
      >
        {getType(type, data)}
      </Box>{' '}
    </Box>
  );
}
