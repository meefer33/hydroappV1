import {createHydrogenContext} from '@shopify/hydrogen';
import {AppSession} from '~/lib/session';
import {CART_QUERY_FRAGMENT} from '~/lib/fragments';
import { AdminApiClient, AdminRestApiClient, createAdminApiClient, createAdminRestApiClient } from '@shopify/admin-api-client';

/**
 * The context implementation is separate from server.ts
 * so that type can be extracted for AppLoadContext
 * */
export async function createAppLoadContext(
  request: Request,
  env: Env,
  executionContext: ExecutionContext,
) {
  /**
   * Open a cache instance in the worker and a custom session instance.
   */
  if (!env?.SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is not set');
  }

  const waitUntil = executionContext.waitUntil.bind(executionContext);
  const [cache, session] = await Promise.all([
    caches.open('hydrogen'),
    AppSession.init(request, [env.SESSION_SECRET]),
  ]);

  const hydrogenContext = createHydrogenContext({
    env,
    request,
    cache,
    waitUntil,
    session,
    i18n: {language: 'EN', country: 'US'},
    cart: {
      queryFragment: CART_QUERY_FRAGMENT,
    },
  });

  const admin:AdminApiClient = createAdminApiClient({
    storeDomain: env.PUBLIC_STORE_DOMAIN,
    apiVersion: env.PRIVATE_ADMIN_API_VERSION,
    accessToken: env.PRIVATE_ADMIN_API_TOKEN,
  });

  const adminRest:AdminRestApiClient = createAdminRestApiClient({
    storeDomain: env.PUBLIC_STORE_DOMAIN,
    apiVersion: env.PRIVATE_ADMIN_API_VERSION,
    accessToken: env.PRIVATE_ADMIN_API_TOKEN,
  });

  return {
    ...hydrogenContext,
    // declare additional Remix loader context
    admin,
    adminRest
  };
}
