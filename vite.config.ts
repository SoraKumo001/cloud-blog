import adapter from "@hono/vite-dev-server/cloudflare";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import serverAdapter from "hono-react-router-adapter/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import wasmImageOptimizationPlugin from "wasm-image-optimization/vite-plugin";

const entry = "./workers/app.ts";

export default defineConfig(() => ({
  resolve: {
    alias: [
      {
        find: "../build/server/index.js",
        replacement: "virtual:react-router/server-build",
      },
    ],
  },
  plugins: [
    serverAdapter({
      adapter,
      entry,
    }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    wasmImageOptimizationPlugin(),
  ],
  ssr: {
    resolve: {
      externalConditions: ["workerd"],
    },
  },
}));
