// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const readerPubBooksProxy = {
	target: "https://reader.pub",
	changeOrigin: true,
	secure: true,
};

// https://astro.build/config
export default defineConfig({
	site: "https://reader.pub",
	trailingSlash: "always",
	integrations: [sitemap()],
	vite: {
		server: {
			proxy: {
				"/books": readerPubBooksProxy,
				"^/reader/": readerPubBooksProxy,
				"/reader_render_v5": readerPubBooksProxy,
			},
		},
		preview: {
			proxy: {
				"/books": readerPubBooksProxy,
				"^/reader/": readerPubBooksProxy,
				"/reader_render_v5": readerPubBooksProxy,
			},
		},
	},
});
