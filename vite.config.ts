import adapter from "@hono/vite-dev-server/cloudflare";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import serverAdapter from "hono-react-router-adapter/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
const entry = "./server.ts";

export default defineConfig(({ isSsrBuild }) => ({
  build: {
    rollupOptions: isSsrBuild
      ? {
          input: entry,
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
      entry,
    }),
    tsconfigPaths(),
  ],
  css: {
    transformer: "lightningcss",
  },
  ssr: {
    resolve: {
      conditions: ["workerd", "worker", "browser"],
      externalConditions: ["workerd", "worker", "browser"],
    },
  },
  resolve: {
    mainFields: ["browser", "module", "main"],
  },
  worker: {
    format: "es",
  },
}));
