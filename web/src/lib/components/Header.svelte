<script lang="ts">
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import LangToggle from '$lib/components/LangToggle.svelte';
	import { i18n, t } from '$lib/i18n.svelte.js';

	let tr = $derived(t[i18n.current]);
	let mobileMenuOpen = $state(false);
</script>

<header
	class="bg-background/80 sticky top-0 z-50 flex items-center border-b px-6 py-3 backdrop-blur"
>
	<div class="flex flex-1">
		<a href={i18n.path('/')} class="text-lg font-semibold">Louis Michault</a>
	</div>

	<div class="hidden md:block">
		<NavigationMenu.Root>
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<NavigationMenu.Link href={i18n.path('/#experience')} class="hover:text-primary px-4 py-2 transition-colors"
						>{tr.nav.experience}</NavigationMenu.Link
					>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Link href={i18n.path('/#projects')} class="hover:text-primary px-4 py-2 transition-colors"
						>{tr.nav.projets}</NavigationMenu.Link
					>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Link href={i18n.path('/#certifications')} class="hover:text-primary px-4 py-2 transition-colors"
						>{tr.nav.certifications}</NavigationMenu.Link
					>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Link href={i18n.path('/#cv')} class="hover:text-primary px-4 py-2 transition-colors"
						>{tr.nav.cv}</NavigationMenu.Link
					>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Link href={i18n.path('/#contact')} class="hover:text-primary px-4 py-2 transition-colors"
						>{tr.nav.contact}</NavigationMenu.Link
					>
				</NavigationMenu.Item>
			</NavigationMenu.List>
			<NavigationMenu.Viewport />
		</NavigationMenu.Root>
	</div>

	<div class="flex flex-1 justify-end gap-2">
		<LangToggle />
		<ThemeToggle />
		<button
			class="hover:bg-muted md:hidden rounded p-2 transition-colors"
			aria-label="Menu"
			onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
		>
			{#if mobileMenuOpen}
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
			{/if}
		</button>
	</div>
	{#if mobileMenuOpen}
	<nav class="bg-background/95 absolute top-full left-0 right-0 border-b px-6 py-3 md:hidden backdrop-blur">
		<div class="flex flex-col gap-1">
			<a href={i18n.path('/#experience')} class="hover:text-primary py-2 text-sm transition-colors" onclick={() => (mobileMenuOpen = false)}>{tr.nav.experience}</a>
			<a href={i18n.path('/#projects')} class="hover:text-primary py-2 text-sm transition-colors" onclick={() => (mobileMenuOpen = false)}>{tr.nav.projets}</a>
			<a href={i18n.path('/#certifications')} class="hover:text-primary py-2 text-sm transition-colors" onclick={() => (mobileMenuOpen = false)}>{tr.nav.certifications}</a>
			<a href={i18n.path('/#cv')} class="hover:text-primary py-2 text-sm transition-colors" onclick={() => (mobileMenuOpen = false)}>{tr.nav.cv}</a>
			<a href={i18n.path('/#contact')} class="hover:text-primary py-2 text-sm transition-colors" onclick={() => (mobileMenuOpen = false)}>{tr.nav.contact}</a>
		</div>
	</nav>
	{/if}
</header>
