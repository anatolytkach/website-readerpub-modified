// @ts-check
import { defineConfig } from 'astro/config';

const readerPubBooksProxy = {
	target: "https://reader.pub",
	changeOrigin: true,
	secure: true,
};

// https://astro.build/config
export default defineConfig({
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
