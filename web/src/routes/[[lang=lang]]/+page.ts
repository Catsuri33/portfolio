export const prerender = true;

export function entries() {
	return [{}, { lang: 'en' }];
}

// Emits en/index.html: en.html next to the en/ directory would be ambiguous on GitHub Pages
export const trailingSlash = 'always';
