import type { Handle } from '@sveltejs/kit';
import { langFromPath } from '$lib/i18n.svelte.js';

export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', langFromPath(event.url.pathname))
	});
