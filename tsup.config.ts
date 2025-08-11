import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/components/ReactStepSlider.tsx"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: false, // 소스맵 제거하여 파일 크기 줄임
  clean: true,
  minify: true, // 코드 압축 활성화
  external: ["react", "react-dom"],
});
