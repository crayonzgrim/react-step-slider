import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/components/ReactStepSlider.tsx"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: false,
  clean: true,
  minify: true,
  treeshake: true,
  external: ["react", "react-dom"],
  target: "es2018",
  splitting: false,
});
