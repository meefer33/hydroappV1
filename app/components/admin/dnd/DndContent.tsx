import {useEffect, useState} from 'react';
import {
  closestCenter,
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {rectIntersection} from '@dnd-kit/core';
import {Box} from '@mantine/core';
import {useListState} from '@mantine/hooks';
import DndContentSortable from './DndContentSortable';
import {useOutletContext} from '@remix-run/react';
import useThemeUtils from './useEditorUtils';

export interface ItemType {
  id: UniqueIdentifier;
  color: string;
}

export default function DndContent({content, id, updateKey, type="single", zones={}}: any) {
  const {editorContent, setEditorContent, item}: any = useOutletContext();
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

    setEditorContent(nm);
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
      collisionDetection={closestCorners}
    >
      {sections && (
        <DndContentSortable sections={sections} handlers={handlers} type={type} zones={zones} />
      )}

    </DndContext>
  );
}
