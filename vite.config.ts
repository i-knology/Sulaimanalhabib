import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      // svgrOptions: { exportType: "named", ref: true, svgo: false, titleProp: true },
      // include: "**/*.svg",
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
