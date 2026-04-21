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
	<title>Louis Michault — Apprenti Ingénieur DevOps</title>
	<meta name="description" content="Portfolio de Louis Michault, apprenti ingénieur DevOps chez Tiria et étudiant à Polytech Montpellier. Projets en DevOps, développement web et infrastructure." />
	<meta name="author" content="Louis Michault" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://louis-michault.fr/" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://louis-michault.fr/" />
	<meta property="og:title" content="Louis Michault — Apprenti Ingénieur DevOps" />
	<meta property="og:description" content="Portfolio de Louis Michault, apprenti ingénieur DevOps chez Tiria et étudiant à Polytech Montpellier." />
	<meta property="og:locale" content="fr_FR" />
	<meta property="og:locale:alternate" content="en_US" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Louis Michault — Apprenti Ingénieur DevOps" />
	<meta name="twitter:description" content="Portfolio de Louis Michault, apprenti ingénieur DevOps chez Tiria et étudiant à Polytech Montpellier." />

	{@html `<script type="application/ld+json">{"@context":"https://schema.org","@type":"Person","name":"Louis Michault","jobTitle":"Apprenti Ingénieur DevOps","url":"https://louis-michault.fr","email":"contact@louis-michault.fr","sameAs":["https://github.com/Catsuri33","https://www.linkedin.com/in/louis-michault"]}</script>`}

	{@html `<script>
		(function() {
			var t = localStorage.getItem('theme') || 'system';
			var dark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
			if (dark) document.documentElement.classList.add('dark');
		})();
	</script>`}
</svelte:head>
{@render children()}
