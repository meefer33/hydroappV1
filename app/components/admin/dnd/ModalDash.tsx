import {Modal} from '@mantine/core';
import {useOutletContext} from '@remix-run/react';
import EditThemeFormAdmin from './forms/EditThemeFormAdmin';
import EditTemplateFormAdmin from './forms/EditTemplateFormAdmin';

export default function ModalDash() {
  const {modalIsOpen, closeModal, metaData}: any = useOutletContext();

  // console.log(editorContent);
  const getType = () => {
    if (metaData?.type) {
      switch (metaData?.type) {
        case 'themes':
          return <EditThemeFormAdmin />;
        case 'templates':
          return <EditTemplateFormAdmin />;
        default:
          return <></>;
      }
    }
  };
  return (
    <Modal
      opened={modalIsOpen}
      onClose={closeModal}
      //title={contentType}
      centered
    >
      {getType()}
    </Modal>
  );
}
