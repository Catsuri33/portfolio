<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { theme } from '$lib/theme.svelte.js';
	import { i18n } from '$lib/i18n.svelte.js';

	let { children } = $props();

	onMount(() => { theme.init(); i18n.init(); });
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="author" content="Louis Michault" />
	<meta name="robots" content="index, follow" />

	{@html `<script type="application/ld+json">{"@context":"https://schema.org","@type":"Person","name":"Louis Michault","jobTitle":"Apprenti Ingénieur DevOps","url":"https://louis-michault.fr","email":"contact@louis-michault.fr","sameAs":["https://github.com/Catsuri33","https://www.linkedin.com/in/louis-michault"]}</script>`}

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
