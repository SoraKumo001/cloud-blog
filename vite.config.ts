// import { cloudflare } from "@cloudflare/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import serverAdapter from "hono-react-router-adapter/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import wasmImageOptimizationPlugin from "wasm-image-optimization/vite-plugin";
import { getPlatformProxy } from "wrangler";
import type { cloudflareAdapter } from "@hono/vite-dev-server/cloudflare";

const entry = "./workers/app.ts";

const adapter: typeof cloudflareAdapter = async (options) => {
  const proxy = await getPlatformProxy(options?.proxy);
  return {
    env: proxy.env,
    executionContext: proxy.ctx,
    onServerClose: () => proxy.dispose(),
  };
};

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
    // cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    wasmImageOptimizationPlugin("./build/client/assets/"),
  ],
  ssr: {
    resolve: {
      externalConditions: ["worker"],
    },
  },
  environments: {
    ssr: {
      resolve: {
        conditions: ["worker"],
      },
    },
  },
  experimental: { enableNativePlugin: true },
}));
