import {useFetcher} from '@remix-run/react';

export default function useInsertSection() {
  const actionInsertSection = useFetcher();

  const saveSection = async (action: any, appState: any) => {
    const section: any = {
      section:
        appState.data.zones['root:main-content'][action.destinationIndex],
      zones: {},
    };

    const response = await fetch('/api/upsertMetaobject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        handle: {type: 'sections', handle: action.id},
        metaobject: {
          fields: [
            {
              key: 'section_id',
              value: action.id,
            },
            {
              key: 'name',
              value: action.id,
            },
            {
              key: 'section_data',
              value: JSON.stringify(section),
            },
          ],
        },
      }),
    });
    const status = response.status;
    const data = await response.json();
    console.log(status, data);
    return true;
  };

  const saveThemeComponent = async (appData: any) => {
    const metaobjectsIds:any = []
    const wtf = await appData?.data?.zones['root:main-content']?.map(async (section: any) => {
     
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
       // delete appData?.data?.zones[`${section?.props?.id}:section`];
        console.log(saveSection);

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
        console.log(status, data, data.data.metaobjectUpsert.metaobject.id);
        metaobjectsIds.push(data.data.metaobjectUpsert.metaobject.id)
        console.log('metaobjectsIds',metaobjectsIds)
        return metaobjectsIds
    });

    await Promise.all(wtf)
    console.log('metaobjectsIds',metaobjectsIds)
     return  metaobjectsIds
      
  };

  return {saveSection, saveThemeComponent};
}
