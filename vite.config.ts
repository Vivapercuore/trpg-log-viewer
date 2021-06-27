
import path from "path";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
	resolve: {
		alias: [
			{ find: '@src', replacement: path.resolve(__dirname, 'src') },
			{ find: '@img', replacement: path.resolve(__dirname, 'src/assets') },
		],
	},
})

