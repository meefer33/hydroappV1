import {Render, usePuck} from '@measured/puck';
import {useEffect, useState} from 'react';

export default function PuckPreview({config}: any) {
  const {appState} = usePuck();
  const [updateAppState, setUpdateAppState] = useState(appState);
  useEffect(() => {
    setUpdateAppState(appState);
  }, []);
  return <Render config={config} data={updateAppState.data} />;
}
