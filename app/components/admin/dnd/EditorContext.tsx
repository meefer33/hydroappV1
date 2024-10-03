import {useOutletContext, useRouteLoaderData} from '@remix-run/react';
import {createContext, useContext, useReducer, useState} from 'react';
import {buildTheme} from './theme/themeUtils';
import {useListState} from '@mantine/hooks';
import {RootLoader} from '~/root';

// Create a context to hold the state
const EditorContext = createContext<unknown>(null);

// Create a component that will provide the context
// IncrementProvider takes in an argument called children
export const EditorProvider = ({children}: any) => {
  //const {content, breadcrumb, handle}: any = useLoaderData<typeof loader>();
  const {themes,layouts}: any = useOutletContext();
  const [theme, setTheme] = useState(buildTheme(themes[0]?.fields?.theme));
  const [themeConfig, setThemeConfig] = useState(themes[0]?.fields?.theme);
  //const [layout, setLayout] = useState(layouts[0]?.fields?.layout);
  const sortContainerId: any  = 'main';
  const [item, setItem]: any  = useState();
  const [activeItem, setActiveItem]: any  = useState(null);
  const [selectedItem, setSelectedItem]: any  = useState();
  const [sections, handlers]: any  = useListState([]);
  const [handle, setHandle]: any  = useState();
  // In this return value, we passed-in children as the CONSUMER of the PROVIDER
  // This will able children components to access the data inside the context
  return (
    <EditorContext.Provider
      value={{
        theme,
        setTheme,
        themeConfig,
        setThemeConfig,
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
    </EditorContext.Provider>
  );
};

// Create a function that invokes the context
export const useEditorContext = () => {
  return useContext(EditorContext);
};
