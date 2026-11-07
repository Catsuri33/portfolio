<script lang="ts">
	import { i18n, type Lang } from '$lib/i18n.svelte.js';

	const langs: Lang[] = ['fr', 'en'];
</script>

<div class="flex items-center gap-0.5 rounded-full border px-1 py-0.5 text-xs font-medium">
	{#each langs as lang (lang)}
		<a
			href={i18n.alternate(lang)}
			hreflang={lang}
			data-sveltekit-noscroll
			aria-current={i18n.current === lang ? 'true' : undefined}
			class="rounded-full px-2 py-0.5 uppercase transition-colors {i18n.current === lang
				? 'bg-primary text-primary-foreground'
				: 'text-muted-foreground hover:text-foreground'}"
		>
			{lang}
		</a>
	{/each}
</div>
