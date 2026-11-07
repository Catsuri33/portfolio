<script lang="ts">
	import { page } from '$app/state';
	import { i18n, t } from '#lib/i18n.svelte.js';
	import ThemeToggle from '#lib/components/ThemeToggle.svelte';
	import LangToggle from '#lib/components/LangToggle.svelte';

	let tr = $derived(t[i18n.current]);
</script>

<svelte:head><title>{page.status} - Louis Michault</title></svelte:head>

<header
	class="sticky top-0 z-50 flex items-center border-b bg-background/80 px-6 py-3 backdrop-blur"
>
	<div class="flex flex-1">
		<a href={i18n.path('/')} class="text-lg font-semibold">Louis Michault</a>
	</div>
	<div class="flex gap-2">
		<LangToggle />
		<ThemeToggle />
	</div>
</header>

<main class="flex min-h-[90vh] flex-col items-center justify-center gap-6 px-6 text-center">
	<p class="font-mono text-8xl font-bold tracking-tight text-primary md:text-[10rem]">
		{page.status}
	</p>

	<h1 class="text-3xl font-bold md:text-4xl">{tr.not_found.title}</h1>
	<p class="max-w-md text-lg text-muted-foreground">{tr.not_found.desc}</p>

	<a
		href={i18n.path('/')}
		class="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
	>
		{tr.not_found.back}
	</a>
</main>
