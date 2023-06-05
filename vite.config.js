import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";

dns.setDefaultResultOrder("vebatim");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "locahost",
    port: "3001",
  },
});
