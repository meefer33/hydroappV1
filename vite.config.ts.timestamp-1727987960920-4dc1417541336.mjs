// vite.config.ts
import { defineConfig } from "file:///C:/webapps/hydroappV1/node_modules/vite/dist/node/index.js";
import { hydrogen } from "file:///C:/webapps/hydroappV1/node_modules/@shopify/hydrogen/dist/vite/plugin.js";
import { oxygen } from "file:///C:/webapps/hydroappV1/node_modules/@shopify/mini-oxygen/dist/vite/plugin.js";
import { vitePlugin as remix } from "file:///C:/webapps/hydroappV1/node_modules/@remix-run/dev/dist/index.js";
import tsconfigPaths from "file:///C:/webapps/hydroappV1/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    hydrogen(),
    oxygen(),
    remix({
      presets: [hydrogen.preset()],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true
      }
    }),
    tsconfigPaths()
  ],
  build: {
    // Allow a strict Content-Security-Policy
    // withtout inlining assets as base64:
    assetsInlineLimit: 0
  },
  ssr: {
    optimizeDeps: {
      /**
       * Include dependencies here if they throw CJS<>ESM errors.
       * For example, for the following error:
       *
       * > ReferenceError: module is not defined
       * >   at /Users/.../node_modules/example-dep/index.js:1:1
       *
       * Include 'example-dep' in the array below.
       * @see https://vitejs.dev/config/dep-optimization-options
       */
      include: ["fast-deep-equal", "@measured/puck", "@mantine/dropzone", "@dnd-kit/core"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx3ZWJhcHBzXFxcXGh5ZHJvYXBwVjFcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHdlYmFwcHNcXFxcaHlkcm9hcHBWMVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovd2ViYXBwcy9oeWRyb2FwcFYxL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHtkZWZpbmVDb25maWd9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHtoeWRyb2dlbn0gZnJvbSAnQHNob3BpZnkvaHlkcm9nZW4vdml0ZSc7XG5pbXBvcnQge294eWdlbn0gZnJvbSAnQHNob3BpZnkvbWluaS1veHlnZW4vdml0ZSc7XG5pbXBvcnQge3ZpdGVQbHVnaW4gYXMgcmVtaXh9IGZyb20gJ0ByZW1peC1ydW4vZGV2JztcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgaHlkcm9nZW4oKSxcbiAgICBveHlnZW4oKSxcbiAgICByZW1peCh7XG4gICAgICBwcmVzZXRzOiBbaHlkcm9nZW4ucHJlc2V0KCldLFxuICAgICAgZnV0dXJlOiB7XG4gICAgICAgIHYzX2ZldGNoZXJQZXJzaXN0OiB0cnVlLFxuICAgICAgICB2M19yZWxhdGl2ZVNwbGF0UGF0aDogdHJ1ZSxcbiAgICAgICAgdjNfdGhyb3dBYm9ydFJlYXNvbjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgdHNjb25maWdQYXRocygpLFxuICBdLFxuICBidWlsZDoge1xuICAgIC8vIEFsbG93IGEgc3RyaWN0IENvbnRlbnQtU2VjdXJpdHktUG9saWN5XG4gICAgLy8gd2l0aHRvdXQgaW5saW5pbmcgYXNzZXRzIGFzIGJhc2U2NDpcbiAgICBhc3NldHNJbmxpbmVMaW1pdDogMCxcbiAgfSxcbiAgc3NyOiB7XG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICAvKipcbiAgICAgICAqIEluY2x1ZGUgZGVwZW5kZW5jaWVzIGhlcmUgaWYgdGhleSB0aHJvdyBDSlM8PkVTTSBlcnJvcnMuXG4gICAgICAgKiBGb3IgZXhhbXBsZSwgZm9yIHRoZSBmb2xsb3dpbmcgZXJyb3I6XG4gICAgICAgKlxuICAgICAgICogPiBSZWZlcmVuY2VFcnJvcjogbW9kdWxlIGlzIG5vdCBkZWZpbmVkXG4gICAgICAgKiA+ICAgYXQgL1VzZXJzLy4uLi9ub2RlX21vZHVsZXMvZXhhbXBsZS1kZXAvaW5kZXguanM6MToxXG4gICAgICAgKlxuICAgICAgICogSW5jbHVkZSAnZXhhbXBsZS1kZXAnIGluIHRoZSBhcnJheSBiZWxvdy5cbiAgICAgICAqIEBzZWUgaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9kZXAtb3B0aW1pemF0aW9uLW9wdGlvbnNcbiAgICAgICAqL1xuICAgICAgaW5jbHVkZTogWydmYXN0LWRlZXAtZXF1YWwnLCdAbWVhc3VyZWQvcHVjaycsJ0BtYW50aW5lL2Ryb3B6b25lJywnQGRuZC1raXQvY29yZSddLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVAsU0FBUSxvQkFBbUI7QUFDbFIsU0FBUSxnQkFBZTtBQUN2QixTQUFRLGNBQWE7QUFDckIsU0FBUSxjQUFjLGFBQVk7QUFDbEMsT0FBTyxtQkFBbUI7QUFFMUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsU0FBUztBQUFBLElBQ1QsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLE1BQ0osU0FBUyxDQUFDLFNBQVMsT0FBTyxDQUFDO0FBQUEsTUFDM0IsUUFBUTtBQUFBLFFBQ04sbUJBQW1CO0FBQUEsUUFDbkIsc0JBQXNCO0FBQUEsUUFDdEIscUJBQXFCO0FBQUEsTUFDdkI7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELGNBQWM7QUFBQSxFQUNoQjtBQUFBLEVBQ0EsT0FBTztBQUFBO0FBQUE7QUFBQSxJQUdMLG1CQUFtQjtBQUFBLEVBQ3JCO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxjQUFjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQVdaLFNBQVMsQ0FBQyxtQkFBa0Isa0JBQWlCLHFCQUFvQixlQUFlO0FBQUEsSUFDbEY7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
