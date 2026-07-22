import { defineConfig } from "vite";
import path from "path";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  resolve: {
    alias: {
      "@Assets": path.resolve(__dirname, "./src/assets"),
      "@Utils": path.resolve(__dirname, "./src/Utils"),
      "@UI": path.resolve(__dirname, "./src/UI"),
      "@Pages": path.resolve(__dirname, "./src/Pages"),
      "@Layout": path.resolve(__dirname, "./src/Layout"),
      "@Hooks": path.resolve(__dirname, "./src/Hooks"),
      "@Contexts": path.resolve(__dirname, "./src/Contexts"),
      "@Routes": path.resolve(__dirname, "./src/routes"),
      "@Cart": path.resolve(__dirname, "./src/Features/cart"),
      "@Address": path.resolve(__dirname, "./src/Features/address"),
      "@Review": path.resolve(__dirname, "./src/Features/reviews"),
      "@Auth": path.resolve(__dirname, "./src/Features/auth"),
      "@Products": path.resolve(__dirname, "./src/Features/produtos"),
    },
  },
});
