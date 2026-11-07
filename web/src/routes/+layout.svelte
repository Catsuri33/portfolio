<script lang="ts">
	import './layout.css';
	import { asset } from '$app/paths';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { theme } from '#lib/theme.svelte.js';
	import { i18n, t } from '#lib/i18n.svelte.js';

	let { children } = $props();

	const origin = 'https://louis-michault.fr';

	onMount(() => {
		theme.init();
	});

	$effect(() => {
		document.documentElement.lang = i18n.current;
	});
</script>

<svelte:head>
	<link rel="icon" href={asset('favicon.ico')} sizes="48x48" />

	<link rel="icon" href={asset('favicon.svg')} type="image/svg+xml" />

	<link rel="icon" href={asset('favicon.png')} type="image/png" sizes="192x192" />

	{#if !page.error}
		<link rel="canonical" href="{origin}{i18n.alternate(i18n.current)}" />
		<link rel="alternate" hreflang="fr" href="{origin}{i18n.alternate('fr')}" />
		<link rel="alternate" hreflang="en" href="{origin}{i18n.alternate('en')}" />
		<link rel="alternate" hreflang="x-default" href="{origin}{i18n.alternate('fr')}" />
	{/if}
	<meta name="author" content="Louis Michault" />
	<meta name="robots" content="index, follow" />

	{@html `<script type="application/ld+json">{"@context":"https://schema.org","@type":"Person","name":"Louis Michault","jobTitle":"${t[i18n.current].hero.role}","url":"https://louis-michault.fr","email":"contact@louis-michault.fr","sameAs":["https://github.com/Catsuri33","https://www.linkedin.com/in/louis-michault"]}</script>`}

	{@html `<script>
		(function() {
			var t = localStorage.getItem('theme') || 'system';
			var dark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
			if (dark) document.documentElement.classList.add('dark');
		})();
	</script>`}
	<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>
{@render children()}
