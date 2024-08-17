import {Config, Render, resolveAllData, usePuck} from '@measured/puck';
import {LoaderFunctionArgs} from '@remix-run/node';
import {
  Links,
  MetaDescriptor,
  MetaFunction,
  Outlet,
  useLoaderData,
} from '@remix-run/react';
import {richTextSection} from '~/components/admin/puck/sections/richTextSection';
import {section} from '~/components/admin/puck/sections/section';
import {theme} from '~/components/admin/puck/sections/theme';
import {parseCmsContent, parseContent} from '~/lib/parseContent';
import {GetMetaobjectByHandle} from '~/graphql/admin/GetMetaobjectByHandle';
import PuckLayout from '~/components/admin/puck/PuckLayout';
import {header} from '~/components/admin/puck/sections/header';
import {MantineProvider} from '@mantine/core';
import {GetPage} from '~/graphql/GetPage';
import {contentLayout} from '~/components/admin/puck/sections/contentLayout';
import {CacheCustom, CacheNone} from '@shopify/hydrogen';
import {cssResolver, loadFonts, updateSettings} from '~/lib/utils';
import {imageSection} from '~/components/admin/puck/sections/imageSection';
import {collectionGrid} from '~/components/admin/puck/sections/collectionGrid';
import {productScroll} from '~/components/admin/puck/sections/productScroll';
import {useState} from 'react';
import {grid} from '~/components/admin/puck/sections/grid';
import {Aside} from '~/components/layout/Aside';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return loadFonts(
    data?.fields?.layout?.fields?.theme?.fields?.settings?.other?.fonts,
  ) satisfies MetaDescriptor[];
};

export const loader = async ({context, params}: LoaderFunctionArgs) => {
  const {storefront} = context;
  const handle = 'home';

  const getPage = await storefront.query(GetPage, {
    variables: {
      handle: 'home',
    },
    cache: CacheNone(),
  });
  const parsePage = getPage?.page?.metafield?.reference ? parseContent(getPage?.page?.metafield?.reference) : {};

  return parsePage;
};

export default function PreviewPage() {
  const data: any = useLoaderData<typeof loader>();
  const [viewport, setViewport] = useState('100%');

  const settings = updateSettings(
    data?.fields?.layout?.fields?.theme?.fields?.settings,
  );
  console.log(data);
  const config: Config | any = {
    components: {
      Section: section(settings),
      Grid: grid(settings),
      RichTextEditor: richTextSection(),
      Image: imageSection(),
      ProductScroll: productScroll(viewport, settings),
      CollectionGrid: collectionGrid(settings),
    },
    root: contentLayout(data.fields?.layout?.fields?.layout),
  };

  return (
    <>
      <Render config={config} data={data.fields?.content?.data || {}} />
    </>
  );
}

export const handle = {
  breadcrumb: () => <span>Pages</span>,
};

/*
    <MantineProvider
      theme={data.fields.layout.fields.theme.fields.settings}
      forceColorScheme={data.fields.layout.fields.theme.fields.settings.other.colorScheme}
    >
     <PuckLayout
     config={config}
     contentData={data.fields?.layout?.fields?.layout}
     saveMeta={data}
   />
 </MantineProvider>


*/
