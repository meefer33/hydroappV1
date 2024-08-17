# Hydrogen template: Skeleton

Hydrogen is Shopify’s stack for headless commerce. Hydrogen is designed to dovetail with [Remix](https://remix.run/), Shopify’s full stack web framework. This template contains a **minimal setup** of components, queries and tooling to get started with Hydrogen.

[Check out Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)
[Get familiar with Remix](https://remix.run/docs/en/v1)

## What's included

- Remix
- Hydrogen
- Oxygen
- Vite
- Shopify CLI
- ESLint
- Prettier
- GraphQL generator
- TypeScript and JavaScript flavors
- Minimal setup of components and routes

## Getting started

**Requirements:**

- Node.js version 18.0.0 or higher

```bash
npm create @shopify/hydrogen@latest
```

## Building for production

```bash
npm run build
```

## Local development

```bash
npm run dev
```

## Setup for using Customer Account API (`/account` section)

Follow step 1 and 2 of <https://shopify.dev/docs/custom-storefronts/building-with-the-customer-account-api/hydrogen#step-1-set-up-a-public-domain-for-local-development>

## Hydroapp steps

```bash
npm install -D @measured/puck
```

```bash
npm install @mantine/core @mantine/hooks @mantine/form @mantine/colors-generator @mantine/dropzone @mantine/tiptap @mantine/carousel
```

```bash
npm install @tiptap/core @tiptap/extension-color @tiptap/extension-highlight @tiptap/extension-text-align @tiptap/extension-text-style @tiptap/extension-underline @tiptap/html @tiptap/starter-kit dayjs embla-carousel-react @remixicon/react @tabler/icons-react
```

```bash
npm install -D @shopify/admin-api-client
```

copy over components -> admin
copy over all _dash and _puck routes
copy over api routes except predictive search

copy over theme.css
add styles to root.tsx

copy over graphql statements
copy over lib -> utils.ts, parseContent.ts

add in admin client to context.ts


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

  add in deps to vite.config.ts -> 'fast-deep-equal','@measured/puck','@mantine/dropzone'
