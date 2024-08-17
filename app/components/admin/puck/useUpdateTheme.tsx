import {useFetcher} from '@remix-run/react';

export default function useUpdateTheme() {
  const actionUpdateSettings = useFetcher();
  const saveTheme = (handle,theme) => {
    actionUpdateSettings.submit(
      {
        handle: {
          type: 'ha_theme_settings',
          handle: handle,
        },
        metaobject: {
          fields: [
            {
              key: 'name',
              value: handle,
            },
            {
              key: 'settings',
              value: JSON.stringify(theme),
            },
          ],
        },
      },
      {
        method: 'PUT',
        action: '/api/upsertMetaobject',
        encType: 'application/json',
      },
    );
  }; 

  return {saveTheme}
}
