import {redirect} from '@shopify/remix-oxygen';

export async function loader() {
  return redirect('/themes/default-theme');
}