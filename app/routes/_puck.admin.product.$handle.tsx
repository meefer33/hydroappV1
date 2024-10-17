import {Config, Render, resolveAllData, usePuck} from '@measured/puck';
import {LoaderFunctionArgs} from '@remix-run/node';
import {
  Links,
  MetaDescriptor,
  MetaFunction,
  Outlet,
  useLoaderData,
} from '@remix-run/react';
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
import {GetProductContent} from '~/graphql/admin/GetProductContent';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return loadFonts(
    data?.themeSettings?.fields?.settings?.other?.fonts,
  ) satisfies MetaDescriptor[];
};

export const loader = async ({context, params}: LoaderFunctionArgs) => {
  const {admin, storefront} = context;
  const handle = params.handle;

  const productContent = await admin.request(GetProductContent, {
    variables: {
      handle: handle,
    },
    cache: CacheNone(),
  });

  const getThemeSettings = await admin.request(GetMetaobjectByHandle, {
    variables: {
      handle: {type: 'ha_theme_settings', handle: 'main'},
    },
  });
  const themeSettings = parseContent(
    getThemeSettings?.data?.metaobjectByHandle,
  );

  const getThemeLayouts = await admin.request(GetMetaobjectByHandle, {
    variables: {
      handle: {type: 'ha_theme_layouts', handle: 'main'},
    },
  });
  const themeLayout = parseContent(getThemeLayouts?.data?.metaobjectByHandle);

  return {productContent, themeSettings, themeLayout};
};

export default function EditProduct() {
  const data: any = useLoaderData<typeof loader>();
  const [viewport, setViewport] = useState('100%');
  console.log('product', data?.productContent);
  const settings = updateSettingsEditMode(
    data?.themeSettings?.fields?.settings,
  );
  const layout = data?.themeLayout.fields?.layout

  const config: Config | any = {
    components: {
      Section: section(settings),
      Grid: grid(settings),
      Image: imageSection(),
      ProductScroll: productScroll(viewport, settings),
      CollectionGrid: collectionGrid(settings),
    },
    root: contentLayout(layout, 'editor'),
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
      //contentData={data.getProductContent?.content}
      saveMeta={data}
      type="content"
      viewport={viewport}
      setViewport={setViewport}
      theme={data?.parseTheme?.fields?.settings}
    />
  );
}

export const handle = {
  breadcrumb: () => <span>Pages</span>,
};
