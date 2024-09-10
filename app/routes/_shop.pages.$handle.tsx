import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import {GetPage} from '~/graphql/GetPage';
import {parseContent} from '~/lib/parseContent';
import {useState} from 'react';
import {updateSettings} from '~/lib/utils';
import {Config, Render} from '@measured/puck';
import {section} from '~/components/admin/puck/sections/section';
import {grid} from '~/components/admin/puck/sections/grid';
import {richTextSection} from '~/components/admin/puck/sections/richTextSection';
import {imageSection} from '~/components/admin/puck/sections/imageSection';
import {productScroll} from '~/components/admin/puck/sections/productScroll';
import {collectionGrid} from '~/components/admin/puck/sections/collectionGrid';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Hydrogen | ${data?.page.title ?? ''}`}];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, params}: LoaderFunctionArgs) {
  if (!params.handle) {
    throw new Error('Missing page handle');
  }

  const getPage = await context.storefront.query(GetPage, {
    variables: {
      handle: params.handle,
    },
    //cache: CacheNone(),
  });

  if (!getPage) {
    throw new Response('Not Found', {status: 404});
  }

  return getPage;
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  return {};
}

export default function Page() {
  const data: any = useLoaderData<typeof loader>();
  const [viewport, setViewport] = useState('100%');
console.log(data)
  const parsePage = data.page?.metafield?.reference
  ? parseContent(data.page?.metafield?.reference)
  : {};

  const settings = updateSettings(
    parsePage?.fields?.layout?.fields?.theme?.fields?.settings,
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

  return <Render config={config} data={parsePage.fields?.content?.data || {}} />;
}

export const handle = {
  breadcrumb: () => <span>Pages</span>,
};

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
` as const;
