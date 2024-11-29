import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  return {
    build: {
      lib: {
        entry: "src/index.ts",
        name: "ZrenderHelper",
        fileName: (format) => `index.${format}.js`,
      },
      sourcemap: mode === "production" ? false : "inline",
      rollupOptions: {
        external: ["zrender"], // 如果有外部依赖，列在这里
        output: {
          globals: {
            zrender: "Zrender",
          },
        },
      },
    },
  };
});
