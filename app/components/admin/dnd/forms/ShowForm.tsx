import {useState} from 'react';
import SectionForm from './SectionForm';
import {useEditorContext} from '../EditorContext';
import GridForm from './GridForm';

export default function ShowForm() {
  const {sections, selectedItem, activeItem}: any = useEditorContext();
  const formType = sections?.find(
    (section: any) => section.id === selectedItem,
  );
  //console.log('activeItem', activeItem);

  const getForm = (type: any) => {
    switch (type) {
      case 'section':
        return <SectionForm />;
        case 'grid':
          return <GridForm />;
      default:
        return null;
    }
  };

  return getForm(formType?.type);
}
