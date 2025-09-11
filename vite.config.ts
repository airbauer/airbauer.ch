import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

const config: UserConfig = {
  plugins: [
    sveltekit(),
    visualizer({ open: true, filename: "bundle-report.html" }),
  ],
};

export default config;
