import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
	plugins: [
		sveltekit(),
		ViteImageOptimizer({
			webp: {
    		lossless: false,
  		},
  		avif: {
    		lossless: false,
  		},
    }),
	],
	build: {
		cssMinify: 'lightningcss',
	}
});
