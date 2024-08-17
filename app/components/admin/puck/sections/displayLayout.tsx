import {DropZone} from '@measured/puck';

export const displayLayout = () => {
  const config = {
    fields: {},

    render: ({...props}) => {
      return <DropZone zone="main" allow={["Section","CollectionGrid","ProductScroll"]} />;
    },
  };
  return config;
};
