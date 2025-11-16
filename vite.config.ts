import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [react(),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3001,
    host: "0.0.0.0",
    allowedHosts: ["webapp-test.bakai.kg"]
  },
  build: {
    commonjsOptions: {
      defaultIsModuleExports: true
    }
  }
});
