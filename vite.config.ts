import { cloudflare } from "@cloudflare/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import wasmImageOptimizationPlugin from "wasm-image-optimization/vite-plugin";

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: [
      {
        find: "../build/server/index.js",
        replacement: "virtual:react-router/server-build",
      },
    ],
  },
  plugins: [
    mode === "production"
      ? undefined
      : cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    wasmImageOptimizationPlugin("./build/client/assets/"),
  ],
  experimental: { enableNativePlugin: true },
}));
