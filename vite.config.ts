import react from "@vitejs/plugin-react";
import inject from "@rollup/plugin-inject";
import { defineConfig } from "vite";

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig(({ command }) => {
  const define =
    command === "serve"
      ? { global: "globalThis" }
      : {
          global: (() => {
            let globalVariable = "globalThis";
            try {
              // Try to import @safe-global/safe-apps-provider
              require.resolve("@safe-global/safe-apps-provider");
              // Try to import @safe-global/safe-apps-sdk
              require.resolve("@safe-global/safe-apps-sdk");
              // If both modules are found, return the custom global variable
              globalVariable = "global";
            } catch (e) {
              // If either module is not found, fallback to globalThis
              globalVariable = "globalThis";
            }
            return globalVariable;
          })(),
        };

  return {
    /**
     * Defines global constant replacments
     * @see https://vitejs.dev/config/shared-options.html#define
     */
    define,
    build: {
      rollupOptions: {
        external: ["@safe-globalThis/safe-apps-provider"],
      },
    },
    resolve: {
      /**
       * Polyfills nodejs imports
       * @see https://vitejs.dev/config/shared-options.html#resolve-alias
       */
      alias: {
        process: "process/browser",
        util: "util",
      },
    },
    /**
     * Enables react
     * @see https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md
     */
    plugins: [
      [
        react({
          jsxRuntime: "classic",
        }),
        {
          ...inject({
            global: [
              require.resolve("node-stdlib-browser/helpers/esbuild/shim"),
              "global",
            ],
            process: [
              require.resolve("node-stdlib-browser/helpers/esbuild/shim"),
              "process",
            ],
            Buffer: [
              require.resolve("node-stdlib-browser/helpers/esbuild/shim"),
              "Buffer",
            ],
          }),
          enforce: "post",
        },
      ],
    ],
  };
});
