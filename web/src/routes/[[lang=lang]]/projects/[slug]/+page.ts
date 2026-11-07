import { error } from '@sveltejs/kit';
import { projects } from '$lib/projects';
import type { PageLoad } from './$types';

const rawContent = import.meta.glob('/src/lib/content/projects/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

export const prerender = true;

export function entries() {
	return projects.flatMap(({ slug }) => [{ slug }, { lang: 'en', slug }]);
}

export const load: PageLoad = ({ params }) => {
	const project = projects.find((p) => p.slug === params.slug);
	const fr = rawContent[`/src/lib/content/projects/${params.slug}.fr.md`];
	const en = rawContent[`/src/lib/content/projects/${params.slug}.en.md`];

	if (!project || !fr || !en) {
		error(404, 'Project not found');
	}

	return { project, content: { fr, en } };
};
