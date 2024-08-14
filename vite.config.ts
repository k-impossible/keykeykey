//vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import compression from "vite-plugin-compression";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		compression({ algorithm: "gzip" }),
		compression({ algorithm: "brotliCompress", ext: ".br" }),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src/"),
		},
	},
	build: {
		outDir: "dist",
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ["react", "react-dom", "react-router-dom"],
					firebase: [
						"firebase/app",
						"firebase/auth",
						"firebase/storage",
						"firebase/firestore",
					],
					ui: [
						"@radix-ui/react-alert-dialog",
						"@radix-ui/react-avatar",
						"@radix-ui/react-checkbox",
						"@radix-ui/react-label",
						"@radix-ui/react-select",
						"@radix-ui/react-slot",
						"@radix-ui/react-tooltip",
					],
				},
			},
		},
	},
});
