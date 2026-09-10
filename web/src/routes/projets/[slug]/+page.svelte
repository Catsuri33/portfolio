<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { base } from '$app/paths';
	import { i18n, t } from '$lib/i18n.svelte.js';
	import { renderMarkdown } from '$lib/markdown.js';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let tr = $derived(t[i18n.current]);
	let html = $derived(renderMarkdown(data.content[i18n.current]));
</script>

<svelte:head>
	<title>{data.project.title} - Louis Michault</title>
	<meta name="description" content={data.project.desc[i18n.current]} />
	<link rel="canonical" href="https://louis-michault.fr/projets/{data.project.slug}" />

	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://louis-michault.fr/projets/{data.project.slug}" />
	<meta property="og:title" content="{data.project.title} - Louis Michault" />
	<meta property="og:description" content={data.project.desc[i18n.current]} />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="{data.project.title} - Louis Michault" />
	<meta name="twitter:description" content={data.project.desc[i18n.current]} />
</svelte:head>

<Header />

<main class="px-6 py-16">
	<article class="mx-auto max-w-3xl">
		<a
			href="{base}/#projects"
			class="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1.5 text-sm transition-colors"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
			{tr.projets.back}
		</a>

		<div class="mb-6 flex flex-wrap items-start justify-between gap-4">
			<div>
				<div class="mb-3 flex flex-wrap gap-2">
					{#each data.project.tags as tag}
						<span class="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs">
							{tag}
						</span>
					{/each}
				</div>
				<h1 class="text-3xl font-bold md:text-4xl">{data.project.title}</h1>
				<p class="text-muted-foreground mt-2">{data.project.desc[i18n.current]}</p>
			</div>

			{#if data.project.github}
				<a
					href={data.project.github}
					target="_blank"
					rel="noopener"
					class="border-border hover:bg-muted flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"
						><path
							d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
						/></svg
					>
					{tr.projets.github}
				</a>
			{/if}
		</div>

		<div class="markdown-content">
			{@html html}
		</div>
	</article>
</main>

<Footer />
