import {useOutletContext, useRouteLoaderData} from '@remix-run/react';
import {createContext, useContext, useReducer, useState} from 'react';
import {buildTheme} from './theme/themeUtils';
import {useListState} from '@mantine/hooks';
import {RootLoader} from '~/root';

// Create a context to hold the state
const GridEditorContext = createContext<unknown>(null);

// Create a component that will provide the context
// IncrementProvider takes in an argument called children
export const GridEditorProvider = ({children}: any) => {

  const sortContainerId: any  = 'grid';
  const [item, setItem]: any  = useState();
  const [activeItem, setActiveItem]: any  = useState(null);
  const [selectedItem, setSelectedItem]: any  = useState();
  const [sections, handlers]: any  = useListState([]);
  const [handle, setHandle]: any  = useState();
  // In this return value, we passed-in children as the CONSUMER of the PROVIDER
  // This will able children components to access the data inside the context
  return (
    <GridEditorContext.Provider
      value={{
        sortContainerId,
        item,
        setItem,
        activeItem,
        setActiveItem,
        selectedItem,
        setSelectedItem,
        sections,
        handlers,
        handle, 
        setHandle
      }}
    >
      {children}
    </GridEditorContext.Provider>
  );
};

// Create a function that invokes the context
export const useGridEditorContext = () => {
  return useContext(GridEditorContext);
};
