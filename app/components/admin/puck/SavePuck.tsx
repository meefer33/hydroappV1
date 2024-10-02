import {Button} from '@mantine/core';
import {usePuck} from '@measured/puck';
import {useFetcher} from '@remix-run/react';
import {useEffect} from 'react';
import useInsertSection from './useInsertSection';

export default function SavePuck({saveMeta, type, setIsSaving}: any) {
  const {appState} = usePuck();
 // const {saveThemeComponent} = useInsertSection()
  const updateMetafield = useFetcher();
  const isSaving = updateMetafield.state !== 'idle';
  const updateGlobal = useFetcher();

  const saveThemeComponent = async (appData: any) => {
    const metaobjectsIds:any = []
    const sectionMetaIds = await appData?.data?.zones['root:main-content']?.map(async (section: any) => {
     
        let saveSection: any = {
          section: section,
          zones: {},
        };
        saveSection.zones[`${section?.props?.id}:section`] =
          appData?.data?.zones[`${section?.props?.id}:section`];

       appData?.data?.zones[`${section?.props?.id}:section`].map(
          async (components: any) => {
            if (components.type === 'Grid') {
              for (let i = 0; i < components.props.content.columns; i++) {
                saveSection.zones[`${components.props.id}:col-${i + 1}`] =
                  appData?.data?.zones[`${components.props.id}:col-${i + 1}`];

               // delete appData?.data?.zones[ `${components.props.id}:col-${i + 1}` ];
              }
            }
          },
    
        );

        const response = await fetch('/api/upsertMetaobject', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            handle: {type: 'sections', handle: section?.props?.id},
            metaobject: {
              fields: [
                {
                  key: 'section_id',
                  value: section?.props?.id,
                },
                {
                  key: 'name',
                  value: section?.props?.global_name,
                },
                {
                  key: 'section_data',
                  value: JSON.stringify(saveSection),
                },
              ],
            },
          }),
        });

        const status = response.status;
        const data:any = await response.json();
        metaobjectsIds.push(data.data.metaobjectUpsert.metaobject.id)
        return metaobjectsIds
    });

    await Promise.all(sectionMetaIds)
    console.log('metaobjectsIds',metaobjectsIds)
     return  metaobjectsIds
      
  };

  const saveContent = (appData:any,stc:any) => {
    console.log('saveMeta.id',saveMeta.handle,stc)
    updateMetafield.submit(
      {
        handle: {type: 'content', handle: saveMeta.handle},
        metaobject: {
          fields: [
            {
              key: 'name',
              value: saveMeta.handle,
            },
            {
              key: 'content_data',
              value: JSON.stringify(appData.data),
            },
            {
              key: 'sections',
              value: JSON.stringify(stc),
            },
          ],
        },
      },
      {
        method: 'POST',
        action: '/api/upsertMetaobject',
        encType: 'application/json',
      },
    );
  };

  const save = async (appData: any) => {
    console.log('appdata', appData);
   // console.log('appdata', appData?.data?.zones['root:main-content']);

    setIsSaving(true);
   const stc:any =  await saveThemeComponent(appData);
    saveContent(appData,stc);
  
  };

  useEffect(() => {
    updateMetafield.state === 'idle' && setIsSaving(false);
  }, [updateMetafield.state]);

  return (
    <Button
      loading={isSaving}
      loaderProps={{type: 'dots'}}
      color="gray.7"
      onClick={(e) => {
        e.preventDefault();
        save(appState);
      }}
    >
      Save
    </Button>
  );
}
