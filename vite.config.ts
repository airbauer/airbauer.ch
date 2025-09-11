import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

const analyze = process.env.ANALYZE === "true";

const config: UserConfig = {
  plugins: [
    sveltekit(),
    ...(analyze
      ? [visualizer({ open: true, filename: "bundle-report.html" })]
      : []),
  ],
};

export default config;
