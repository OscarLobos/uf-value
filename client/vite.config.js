import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";
const path = require("path");

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, "dist"),
  resolve: {
    alias: { "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap") },
  },
  server: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
