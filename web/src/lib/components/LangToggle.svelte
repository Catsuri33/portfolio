<script lang="ts">
	import { i18n } from '$lib/i18n.svelte.js';
</script>

<div class="flex items-center gap-0.5 rounded-full border px-1 py-0.5 text-xs font-medium">
	<button
		onclick={() => i18n.set('fr')}
		class="rounded-full px-2 py-0.5 transition-colors {i18n.current === 'fr'
			? 'bg-primary text-primary-foreground'
			: 'text-muted-foreground hover:text-foreground'}"
		aria-pressed={i18n.current === 'fr'}
	>
		FR
	</button>
	<button
		onclick={() => i18n.set('en')}
		class="rounded-full px-2 py-0.5 transition-colors {i18n.current === 'en'
			? 'bg-primary text-primary-foreground'
			: 'text-muted-foreground hover:text-foreground'}"
		aria-pressed={i18n.current === 'en'}
	>
		EN
	</button>
</div>
