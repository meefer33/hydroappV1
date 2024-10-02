import {useFetcher} from '@remix-run/react';

export default function useSavePuck() {
  const actionInsertSection = useFetcher();

  const saveSection = (action:any,appState:any) => {
    const section = appState.data.zones["root:main-content"][action.destinationIndex]
    
  };

  return {saveSection};
}
