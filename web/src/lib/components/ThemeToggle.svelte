<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { theme } from '$lib/theme.svelte.js';

	const options = [
		{ value: 'light' as const, label: 'Clair' },
		{ value: 'dark' as const, label: 'Sombre' },
		{ value: 'system' as const, label: 'Système' }
	];
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class="hover:bg-muted rounded-full p-2 transition-colors"
		aria-label="Changer le thème"
	>
		{#if theme.current === 'dark'}
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
			</svg>
		{:else if theme.current === 'light'}
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
			</svg>
		{:else}
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/>
			</svg>
		{/if}
	</DropdownMenu.Trigger>

	<DropdownMenu.Content align="end">
		{#each options as option}
			<DropdownMenu.Item
				onclick={() => theme.set(option.value)}
				class={theme.current === option.value ? 'text-primary font-medium' : ''}
			>
				{option.label}
			</DropdownMenu.Item>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
