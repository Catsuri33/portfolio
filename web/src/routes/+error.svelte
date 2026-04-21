<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { i18n, t } from '$lib/i18n.svelte.js';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import LangToggle from '$lib/components/LangToggle.svelte';

	let tr = $derived(t[i18n.current]);
</script>

<svelte:head>
	<title>{$page.status} — Louis Michault</title>
</svelte:head>

<header class="bg-background/80 sticky top-0 z-50 flex items-center border-b px-6 py-3 backdrop-blur">
	<div class="flex flex-1">
		<a href="{base}/" class="text-lg font-semibold">Louis Michault</a>
	</div>
	<div class="flex gap-2">
		<LangToggle />
		<ThemeToggle />
	</div>
</header>

<main class="flex min-h-[90vh] flex-col items-center justify-center gap-6 px-6 text-center">
	<p class="text-primary font-mono text-8xl font-bold tracking-tight md:text-[10rem]">
		{$page.status}
	</p>
	<h1 class="text-3xl font-bold md:text-4xl">
		{tr.not_found.title}
	</h1>
	<p class="text-muted-foreground max-w-md text-lg">
		{tr.not_found.desc}
	</p>
	<a
		href="{base}/"
		class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-2.5 text-sm font-medium transition-colors"
	>
		{tr.not_found.back}
	</a>
</main>
