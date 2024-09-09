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
import {ActionIcon, MantineProvider} from '@mantine/core';
import {GetPage} from '~/graphql/GetPage';
import {contentLayout} from '~/components/admin/puck/sections/contentLayout';
import {CacheCustom, CacheNone} from '@shopify/hydrogen';
import {
  cssResolver,
  loadFonts,
  updateSettings,
  updateSettingsEditMode,
} from '~/lib/utils';
import {imageSection} from '~/components/admin/puck/sections/imageSection';
import {collectionGrid} from '~/components/admin/puck/sections/collectionGrid';
import {productScroll} from '~/components/admin/puck/sections/productScroll';
import {useState} from 'react';
import {grid} from '~/components/admin/puck/sections/grid';
import {RiEyeLine} from '@remixicon/react';
import {useToggle} from '@mantine/hooks';
import PuckRender from '~/components/admin/puck/PuckRender';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return loadFonts(
    data?.fields?.layout?.fields?.theme?.fields?.settings?.other?.fonts,
  ) satisfies MetaDescriptor[];
};

export const loader = async ({context, params}: LoaderFunctionArgs) => {
  const {storefront} = context;
  const handle = params.handle;

  const getPage = await storefront.query(GetPage, {
    variables: {
      handle: handle,
    },
    cache: CacheNone(),
  });
  const parsePage = parseContent(getPage?.page?.metafield?.reference);

  return parsePage;
};

export default function EditPage() {
  const data: any = useLoaderData<typeof loader>();
  const [viewport, setViewport] = useState('100%');
  //console.log('page', data?.fields?.layout?.fields?.theme?.fields?.settings);
  const settings = updateSettingsEditMode(
    data?.fields?.layout?.fields?.theme?.fields?.settings,
  );

  const config: Config | any = {
    components: {
      Section: section(settings),
      Grid: grid(settings),
      RichTextEditor: richTextSection(),
      Image: imageSection(),
      ProductScroll: productScroll(viewport, settings),
      CollectionGrid: collectionGrid(settings),
    },
    root: contentLayout(data.fields?.layout?.fields?.layout, 'editor'),
    categories: {
      sections: {
        components: ['Section', 'Grid', 'RichTextEditor', 'Image'],
        //visible: false,
      },
    },
  };

  return (
    <PuckLayout
      config={config}
      contentData={data.fields?.content}
      saveMeta={data}
      type="content"
      viewport={viewport}
      setViewport={setViewport}
      theme={data?.fields?.layout?.fields?.theme?.fields?.settings}
    />
  );
}

export const handle = {
  breadcrumb: () => <span>Pages</span>,
};
