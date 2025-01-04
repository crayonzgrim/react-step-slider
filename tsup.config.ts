import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/components/ReactStepSlider.tsx"], // 엔트리 파일 지정
  format: ["esm", "cjs"], // ESM 및 CJS 포맷으로 빌드
  dts: true, // 타입 정의 파일 생성
  sourcemap: true, // 소스맵 생성
  clean: true, // 빌드 전에 이전 파일 삭제
  external: ["react", "react-dom"], // 외부 의존성 처리
});
