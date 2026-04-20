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
	{@html `<script>
		(function() {
			var t = localStorage.getItem('theme') || 'system';
			var dark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
			if (dark) document.documentElement.classList.add('dark');
		})();
	</script>`}
</svelte:head>
{@render children()}
