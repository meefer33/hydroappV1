import {useHeadroom} from '@mantine/hooks';
import {Box, Container} from '@mantine/core';
import ThemeHeader from '../theme/ThemeHeader';
import {DropZone} from '@measured/puck';
import {useRouteLoaderData} from '@remix-run/react';
import {RootLoader} from '~/root';
import Header from '~/components/layout/Header';
import {Aside} from '~/components/layout/Aside';

export const contentLayout = (layout:any = {}) => {
  const data: any = useRouteLoaderData<RootLoader>('root');
  const ld:any = layout?.data?.zones['root:header'][0].props;
  const config = {
    fields: {},

    render: ({children}:any) => {
      return (
        <>
          {data.header && <ThemeHeader {...ld} />}
          {children}
        </>
      );
    },
  };
  return config;
};
