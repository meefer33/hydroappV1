import {Config, Render} from '@measured/puck';
import {LoaderFunctionArgs} from '@remix-run/node';
import {
  useLoaderData,
} from '@remix-run/react';
import {richTextSection} from '~/components/admin/puck/sections/richTextSection';
import {section} from '~/components/admin/puck/sections/section';
import {Box} from '@mantine/core';
import {GetPage} from '~/graphql/GetPage';
import {updateSettings} from '~/lib/utils';
import {imageSection} from '~/components/admin/puck/sections/imageSection';
import {collectionGrid} from '~/components/admin/puck/sections/collectionGrid';
import {productScroll} from '~/components/admin/puck/sections/productScroll';
import {useState} from 'react';
import {grid} from '~/components/admin/puck/sections/grid';
import { parseContent } from '~/lib/parseContent';


export const loader = async ({context, params}: LoaderFunctionArgs) => {
  const {storefront} = context;
  const handle = 'home';

  const getPage = await storefront.query(GetPage, {
    variables: {
      handle: 'home',
    },
    //cache: CacheNone(),
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
  };

  return (
    <Box h="1900px">
      <Render config={config} data={data.fields?.content?.data || {}} />
    </Box>
  );
}

export const handle = {
  breadcrumb: () => <span>Pages</span>,
};


