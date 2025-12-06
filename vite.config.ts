import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },

  resolve: {
    alias: {
      "@/shared": path.resolve(__dirname, "src/modules/shared"),
      "@/device": path.resolve(__dirname, "src/modules/device"),
      "@/subscription": path.resolve(__dirname, "src/modules/subscription"),
    },
  },

  test: {
    css: true,
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    exclude: ["./tests/e2e/**", "node_modules"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["./src/modules/**"],
      exclude: ["node_modules/"],
    },
  },
});
