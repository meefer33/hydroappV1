import {Config, usePuck} from '@measured/puck';
import {LoaderFunctionArgs} from '@remix-run/node';
import {MetaDescriptor, MetaFunction, useLoaderData} from '@remix-run/react';
import {richTextSection} from '~/components/admin/puck/sections/richTextSection';
import {section} from '~/components/admin/puck/sections/section';
import {theme} from '~/components/admin/puck/sections/theme';
import {parseContent} from '~/lib/parseContent';
import {GetMetaobjectByHandle} from '~/graphql/admin/GetMetaobjectByHandle';
import PuckLayout from '~/components/admin/puck/PuckLayout';
import {CSSVariablesResolver, MantineProvider} from '@mantine/core';
import {cssResolver, loadFonts, updateSettings, updateSettingsEditMode} from '~/lib/utils';
import { useState } from 'react';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return loadFonts(
    data?.fields?.settings?.other?.fonts,
  ) satisfies MetaDescriptor[];
};

export const loader = async ({context, params}: LoaderFunctionArgs) => {
  const {admin} = context;
  const handle = params.handle;

  const getMetaobject = await admin.request(GetMetaobjectByHandle, {
    variables: {
      handle: {type: 'ha_theme_settings', handle: handle},
    },
  });
  const parseTheme = parseContent(getMetaobject?.data?.metaobjectByHandle);

  return parseTheme;
};

export default function EditTheme() {
  const data: any = useLoaderData<typeof loader>();
  console.log('themer',data)
  const settings = updateSettingsEditMode(data?.fields?.settings)
  const [viewport, setViewport] = useState('100%');

  const config: Config | any = {
    components: {
      Section: section(settings),
      RichTextEditor: richTextSection(),
    },
    root: theme(settings, data.handle ),
  };

  return (

      <PuckLayout
        config={config}
        contentData={data.fields?.theme}
        saveMeta={data}
        type="theme"
        viewport={viewport}
        setViewport={setViewport}
        theme={data?.fields?.settings}
      />
 
  );
}

export const handle = {
  breadcrumb: () => <span>Themes</span>,
};
