import {useState} from 'react';
import SectionForm from './SectionForm';
import {useEditorContext} from '../EditorContext';

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
      default:
        return null;
    }
  };

  return getForm(formType?.type);
}
