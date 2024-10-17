import {Button} from '@mantine/core';
import {useOutletContext} from '@remix-run/react';

export default function ButtonAddSection({data={}}:any) {
  const {openModal, setMetaData}: any = useOutletContext();
  
  return (
    <Button
      onClick={() => {
        openModal() 
        setMetaData(data);
        console.log('metaData',data)
      }}
    >
      Add
    </Button>
  );
}
