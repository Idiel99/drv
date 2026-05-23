import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages base: published at https://idiel99.github.io/drv/site/
export default defineConfig({
  plugins: [react()],
  base: "/drv/site/",
  server: { port: 5173, open: true }
});
