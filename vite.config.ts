import adapter from "@hono/vite-dev-server/cloudflare";
import { reactRouter } from "@react-router/dev/vite";
import serverAdapter from "hono-remix-adapter/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ isSsrBuild }) => ({
  build: {
    rollupOptions: isSsrBuild
      ? {
          input: "./server.ts",
        }
      : undefined,
    minify: true,
    cssMinify: false,
  },
  plugins: [
    tailwindcss(),
    reactRouter(),
    serverAdapter({
      adapter,
      entry: "server.ts",
    }),
    tsconfigPaths(),
  ],
  css: {
    transformer: "lightningcss",
  },
  ssr: {
    resolve: {
      conditions: ["workerd", "worker", "browser"],
      externalConditions: ["workerd", "worker"],
    },
  },
  resolve: {
    mainFields: ["browser", "module", "main"],
  },
  worker: {
    format: "es",
  },
}));
