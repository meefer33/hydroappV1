import {Button} from '@mantine/core';
import {useOutletContext} from '@remix-run/react';

export default function ButtonAddSection({data = {}}: any) {
  const {openModal, setMetaData}: any = useOutletContext();
  const changeTypeName = (type: any) => {
    switch (type) {
      case 'content':
        return 'Add New Section';
      case 'section_blocks':
        return 'Insert New Block';
      case 'blocks':
        return 'Insert New Block Item';
      default:
        return <></>;
    }
  };
  return (
    <Button
      fullWidth
      size="xs"
      variant="filled"
      color="gray.7"
      radius="0"
      onClick={() => {
        openModal();
        setMetaData(data);
        console.log('metaData', data);
      }}
    >
      {changeTypeName(data.type)}
    </Button>
  );
}
