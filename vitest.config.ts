import { defineConfig, defaultExclude } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    setupFiles: "./test/setup.ts",
    exclude: [...defaultExclude, "**/*.spec.tsx"],
  },
});
