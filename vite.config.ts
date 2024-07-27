//vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src/"),
		},
	},
	build: {
		outDir: "dist", // 빌드 출력 디렉토리
		rollupOptions: {
			output: {
				manualChunks: undefined,
			},
		},
	},
});
