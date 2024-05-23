import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@redux": path.resolve("src/redux"),
      "@hooks": path.resolve("src/hooks"),
      "@reduxLayout": path.resolve("src/redux/layout"),
      "@utils": path.resolve("src/utils"),
      "@utilsDcm": path.resolve("src/utils/dcm"),
      "@components": path.resolve("src/components"),
      "@componentUtils": path.resolve("src/components/utils"),
    },
  },
});
