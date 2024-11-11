import {useEffect, useState} from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {rectIntersection} from '@dnd-kit/core';
import {Box} from '@mantine/core';
import {useListState} from '@mantine/hooks';
import DndOutlineSortable from './DndOutlineSortable';
import {useOutletContext} from '@remix-run/react';
import useThemeUtils from './useEditorUtils';
import ButtonAddSection from './ButtonAddSection';

export interface ItemType {
  id: UniqueIdentifier;
  color: string;
}

export default function DndOutline({content, id, updateKey}: any) {
  const [sections, handlers]: any = useListState(content);
  const [activeItem, setActiveItem] = useState(null);
  const {saveMeta} = useThemeUtils();

  useEffect(() => {
    handlers.setState(content);
  }, [content]);

  const handleDragEnd = async ({active, over}: DragEndEvent) => {
    setActiveItem(null);

    const sectionIds: any = [];
    sections.map((section: any) => {
      sectionIds.push(section.id);
    });
    const nm = await saveMeta(id, {
      fields: [
        {
          key: updateKey,
          value: JSON.stringify(sectionIds),
        },
      ],
    });
  };

  const onDragOver = ({active, over}: DragOverEvent) => {
    //console.log('dragover', active.id);
    const active_indx = sections.findIndex((x: any) => x.id === active.id);
    const over_indx = sections.findIndex((x: any) => x.id === over?.id);
    //console.log('dragover-1', active_indx, over_indx);
    if (active_indx !== -1 && over_indx !== -1) {
      if (active_indx === over_indx) return;
      handlers.reorder({from: active_indx, to: over_indx});
    }
  };

  return (
    <DndContext
      onDragStart={({active}: any) => {
        setActiveItem(active?.data);
      }}
      onDragOver={onDragOver}
      onDragCancel={() => {
        setActiveItem(null);
      }}
      onDragEnd={handleDragEnd}
      collisionDetection={rectIntersection}
    >
      {sections && <DndOutlineSortable sections={sections} />}
      <DragOverlay>
        {activeItem ? <Box h={50} bg="blue.2" /> : null}
      </DragOverlay>
    </DndContext>
  );
}
