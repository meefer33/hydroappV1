import {Container, Grid} from '@mantine/core';
import MetaContentEditor from '../../MetaContentEditor';
import {useOutletContext} from '@remix-run/react';
import DndContent from '../../DndContent';

export default function LayoutGrid({content}: any) {
  console.log('layoutgrid',content)
  //const settings = content.fields.settings;
  const {
    item,
    setItem,
    selectedItem,
    setSelectedItem,
    openModal,
    setMetaData,
    editorContent,
  }: any = useOutletContext();

  const getLayout = (layout: any) => {
    switch (layout) {
      case 'h-rs-f':
        return (
          <Grid>
            <Grid.Col span={4}>
            <DndContent
              content={item?.fields?.sidebar}
              id={item?.id}
              updateKey="sidebar"
            /> 
            </Grid.Col>
            <Grid.Col span={8}>
            <DndContent
              content={item?.fields?.main}
              id={item?.id}
              updateKey="main"
            /> 
            </Grid.Col>
          </Grid>
        );

      default:
        return <></>;
    }
  };

  return (
    <></>
  );
}
