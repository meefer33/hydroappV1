import {redirect} from '@shopify/remix-oxygen';

export async function loader() {
  return redirect('/pages/home');
}