import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';

// fallback wild card for all unauthenticated routes in account section
export async function loader({context}: LoaderFunctionArgs) {
  return redirect('/admin/editor/home');
}