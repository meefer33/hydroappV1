import {Config, Render} from '@measured/puck';
import {LoaderFunctionArgs} from '@remix-run/node';
import {
  MetaDescriptor,
  MetaFunction,
  Outlet,
  useLoaderData,
} from '@remix-run/react';
import {section} from '~/components/admin/puck/sections/section';
import {theme} from '~/components/admin/puck/sections/theme';
import {parseContent} from '~/lib/parseContent';
import {GetMetaobjectByHandle} from '~/graphql/admin/GetMetaobjectByHandle';
import PuckLayout from '~/components/admin/puck/PuckLayout';
import {header} from '~/components/admin/puck/sections/header';
import {ActionIcon, Box, MantineProvider} from '@mantine/core';
import {cssResolver, loadFonts, updateSettings, updateSettingsEditMode} from '~/lib/utils';
import {layout} from '~/components/admin/puck/sections/layout';
import {useToggle} from '@mantine/hooks';
import { RiEyeLine } from '@remixicon/react';
import { useState } from 'react';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return loadFonts(
    data?.fields?.theme?.fields?.settings?.other?.fonts,
  ) satisfies MetaDescriptor[];
};

export const loader = async ({context, params}: LoaderFunctionArgs) => {
  const {admin} = context;
  const handle = params.handle;

  const getMetaobject = await admin.request(GetMetaobjectByHandle, {
    variables: {
      handle: {type: 'ha_theme_layouts', handle: handle},
    },
  });
  const parseLayout = parseContent(getMetaobject?.data?.metaobjectByHandle);

  return parseLayout;
};

export default function EditLayout() {
  const data: any = useLoaderData<typeof loader>();
  const [mode, toggle] = useToggle(['edit', 'view']);
  const [viewport, setViewport] = useState('100%');
  
console.log(data)
  const settings = updateSettingsEditMode(data?.fields?.theme?.fields?.settings);
  const config: Config | any = {
    components: {
      Header: header(settings),
      Section: section(settings),
    },
    root: theme(settings, data.fields.theme.handle, true),
  };

  return (
    <>
      <ActionIcon
        variant="filled"
        color="teal"
        aria-label="mode"
        onClick={()=>toggle()}
        pos="fixed"
        top={12}
        right={10}
        size="lg"
        style={{zIndex:999}}
      >
        <RiEyeLine  />
      </ActionIcon>
      { mode === 'view' ? <Render config={config} data={data.fields?.layout.data} /> : 
      <PuckLayout
        config={config}
        contentData={data.fields?.layout}
        saveMeta={data}
        type="layout"
        viewport={viewport}
        setViewport={setViewport}
        theme={data?.fields?.theme?.fields?.settings}
      />
      }
    </>
  );
}

export const handle = {
  breadcrumb: () => <span>Layouts</span>,
};
