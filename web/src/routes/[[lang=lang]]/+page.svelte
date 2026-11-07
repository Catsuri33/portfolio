<script lang="ts">
	import * as Alert from '$lib/components/ui/alert/index.js';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { base } from '$app/paths';
	import { PUBLIC_FORMSPREE_ID, PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
	import { i18n, t } from '$lib/i18n.svelte.js';
	import { projects } from '$lib/projects';
	import { certifications, type Certification } from '$lib/certifications';
	import { onMount } from 'svelte';

	type Localized = { fr: string; en: string };

	let tr = $derived(t[i18n.current]);
	// UTC: ISO dates parse as UTC midnight, so the visitor's timezone must not shift the month
	let issuedFormat = $derived(
		new Intl.DateTimeFormat(i18n.current, { month: 'long', year: 'numeric', timeZone: 'UTC' })
	);

	const certFilters = ['all', 'course', 'certification'] as const;
	let certFilter = $state<(typeof certFilters)[number]>('all');
	const matchesCertFilter = (kind: Certification['kind']) =>
		certFilter === 'all' || kind === certFilter;

	let submitting = $state(false);
	let formSuccess = $state(false);
	let formError = $state('');
	let fieldName = $state('');
	let fieldEmail = $state('');
	let fieldMessage = $state('');
	let turnstileToken = $state('');
	let turnstileError = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
			turnstileError = true;
			return;
		}
		turnstileError = false;
		submitting = true;
		formError = '';
		try {
			const res = await fetch(`https://formspree.io/f/${PUBLIC_FORMSPREE_ID}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify({ name: fieldName, email: fieldEmail, message: fieldMessage })
			});
			if (res.ok) {
				formSuccess = true;
				fieldName = '';
				fieldEmail = '';
				fieldMessage = '';
				turnstileToken = '';
			} else {
				formError = tr.contact.send_error;
			}
		} catch {
			formError = tr.contact.network_error;
		} finally {
			submitting = false;
		}
	}

	onMount(() => {
		(window as any).onTurnstileSuccess = (token: string) => {
			turnstileToken = token;
			turnstileError = false;
		};
		(window as any).onTurnstileExpired = () => { turnstileToken = ''; };

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
					}
				}
			},
			{ threshold: 0.15 }
		);

		document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});

	const experiences: { type: string; date: Localized; title: Localized; org: Localized; desc: Localized; logo?: string }[] = [
		{
			type: 'pro', logo: '/logos/cgm.jpeg',
			date: { fr: 'décembre 2018', en: 'December 2018' },
			title: { fr: 'Stagiaire', en: 'Intern' },
			org: { fr: 'CompuGroup Medical France', en: 'CompuGroup Medical France' },
			desc: {
				fr: 'Stage de troisième, découverte du développement informatique et réalisation d\'un jeu du "pendu" et un "mastermind" en C#.',
				en: 'Third-grade internship, introduction to software development: built a "Hangman" and a "Mastermind" game in C#.'
			}
		},
		{
			type: 'pro', logo: '/logos/dgfip.jpeg',
			date: { fr: 'juillet 2022', en: 'July 2022' },
			title: { fr: 'Contractuel', en: 'Contract employee' },
			org: { fr: 'Direction générale des Finances Publiques', en: 'French Public Finances Directorate' },
			desc: {
				fr: 'Emploi saisonnier dans une Trésorerie des Finances Publiques. Comptabilité et administratif.',
				en: 'Seasonal position at a public treasury office. Accounting and administrative tasks.'
			}
		},
		{
			type: 'pro', logo: '/logos/dgfip.jpeg',
			date: { fr: 'juillet 2023', en: 'July 2023' },
			title: { fr: 'Contractuel', en: 'Contract employee' },
			org: { fr: 'Direction générale des Finances Publiques', en: 'French Public Finances Directorate' },
			desc: {
				fr: 'Emploi saisonnier dans une Trésorerie des Finances Publiques. Comptabilité et administratif.',
				en: 'Seasonal position at a public treasury office. Accounting and administrative tasks.'
			}
		},
		{
			type: 'edu', logo: '/logos/iut_bdx.jpeg',
			date: { fr: '2022 – 2025', en: '2022 – 2025' },
			title: { fr: 'BUT Informatique', en: '3-Year University Degree in Computer Science' },
			org: { fr: 'IUT de Bordeaux', en: 'University Institute of Technology (IUT) of Bordeaux' },
			desc: {
				fr: 'Parcours réalisation d\'applications : conception, développement, validation.',
				en: 'Software development track: design, development and testing of applications.'
			}
		},
		{
			type: 'pro', logo: '/logos/tiria.jpeg',
			date: { fr: '2024 – 2025', en: '2024 – 2025' },
			title: { fr: 'Apprenti Développeur Web', en: 'Web Developer Apprentice' },
			org: { fr: 'Tiria', en: 'Tiria' },
			desc: {
				fr: 'Réalisation d\'applications web et support.',
				en: 'Web application development and technical support.'
			}
		},
		{
			type: 'edu', logo: '/logos/polytech_montpellier.jpeg',
			date: { fr: '2025 – 2028', en: '2025 – 2028' },
			title: { fr: 'Diplôme d\'Ingénieur DevOps en alternance', en: 'Cloud DevOps Engineering Degree (apprenticeship)' },
			org: { fr: 'Polytech Montpellier', en: 'Polytech Montpellier' },
			desc: {
				fr: 'Développement informatique et exploitation opérationnelle.',
				en: 'Software engineering and operational deployment.'
			}
		},
		{
			type: 'pro', logo: '/logos/tiria.jpeg',
			date: { fr: '2025 – présent', en: '2025 – present' },
			title: { fr: 'Apprenti Ingénieur DevOps', en: 'DevOps Engineer Apprentice' },
			org: { fr: 'Tiria', en: 'Tiria' },
			desc: {
				fr: 'Conception, réalisation et déploiement de progiciels web sur mesure.',
				en: 'Design, development and deployment of custom web software.'
			}
		}
	];

</script>

<svelte:head>
	<title>{tr.meta.title}</title>
	<meta name="description" content={tr.meta.description} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://louis-michault.fr{i18n.path('/')}" />
	<meta property="og:title" content={tr.meta.title} />
	<meta property="og:description" content={tr.meta.description} />
	<meta property="og:locale" content={i18n.current === 'fr' ? 'fr_FR' : 'en_US'} />
	<meta property="og:locale:alternate" content={i18n.current === 'fr' ? 'en_US' : 'fr_FR'} />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={tr.meta.title} />
	<meta name="twitter:description" content={tr.meta.description} />
</svelte:head>

<Header />

<section class="flex min-h-[90vh] flex-col items-center justify-center gap-6 px-6 text-center">
	<p class="text-muted-foreground reveal text-sm font-medium uppercase tracking-widest">
		{tr.hero.role}
	</p>
	<h1 class="reveal text-5xl font-bold tracking-tight delay-100 md:text-7xl">Louis Michault</h1>
	<p class="text-muted-foreground reveal max-w-xl text-lg delay-200">
		{tr.hero.desc}
	</p>
	<div class="reveal flex gap-4 delay-300">
		<a
			href="#projects"
			class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-2.5 text-sm font-medium transition-colors"
		>
			{tr.hero.cta_projects}
		</a>
		<a
			href="#contact"
			class="border-border hover:bg-muted rounded-full border px-6 py-2.5 text-sm font-medium transition-colors"
		>
			{tr.hero.cta_contact}
		</a>
	</div>
</section>

<section id="experience" data-nosnippet class="px-6 py-24">
	<div class="mx-auto max-w-3xl">
		<h2 class="reveal mb-16 text-3xl font-bold">{tr.experience.title}</h2>

		<div class="relative">
			<div class="bg-border absolute left-4 top-0 h-full w-px md:left-1/2"></div>

			{#each experiences as item, i}
				<div
					class="reveal relative mb-10 pl-12 md:flex md:gap-0 md:pl-0 {i % 2 === 0
						? 'md:flex-row'
						: 'md:flex-row-reverse'}"
					style="transition-delay: {i * 80}ms"
				>
					<div class="md:w-1/2 {i % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:pl-10'}">
						{#if item.logo}
							<img
								src={item.logo}
								alt={item.org[i18n.current]}
								class="mb-2 h-8 w-auto object-contain {i % 2 === 0 ? 'md:ml-auto' : ''}"
								onerror={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
							/>
						{/if}
						<span
							class="text-muted-foreground mb-1 block text-xs font-semibold uppercase tracking-wide"
						>
							{item.date[i18n.current]}
						</span>
						<h3 class="font-semibold">{item.title[i18n.current]}</h3>
						<p class="text-primary text-sm font-medium">{item.org[i18n.current]}</p>
						<p class="text-muted-foreground mt-1 text-sm">{item.desc[i18n.current]}</p>
					</div>

					<div class="absolute left-0 top-0 flex flex-col items-center md:relative md:left-auto md:top-auto md:w-0">
						<div
							class="z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 {item.type ===
							'edu'
								? 'border-primary bg-background'
								: 'bg-primary text-primary-foreground border-primary'}"
						>
							{#if item.type === 'edu'}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-3.5 w-3.5"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path
										d="M6 12v5c3 3 9 3 12 0v-5"
									/></svg
								>
							{:else}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-3.5 w-3.5"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									><rect width="20" height="14" x="2" y="7" rx="2" /><path
										d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
									/></svg
								>
							{/if}
						</div>
					</div>

					<div class="hidden md:block md:w-1/2"></div>
				</div>
			{/each}
		</div>
	</div>
</section>

<section id="projects" class="bg-muted/40 px-6 py-24">
	<div class="mx-auto max-w-5xl">
		<h2 class="reveal mb-4 text-3xl font-bold">{tr.projets.title}</h2>
		<p class="text-muted-foreground reveal mb-14 max-w-xl delay-100">
			{tr.projets.subtitle}
		</p>

		<div class="grid gap-6 sm:grid-cols-2">
			{#each projects as project, i}
				<div
					class="reveal bg-background group relative rounded-2xl border p-6 transition-shadow hover:shadow-md"
					style="transition-delay: {i * 80}ms"
				>
					<a
						href={i18n.path(`/projects/${project.slug}`)}
						class="absolute inset-0 z-0 rounded-2xl"
						aria-label="{project.title} - {tr.projets.see}"
					></a>

					<div class="mb-3 flex items-start justify-between gap-2">
						<div class="flex flex-wrap gap-2">
							{#each project.tags as tag}
								<span class="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs">
									{tag}
								</span>
							{/each}
						</div>
						{#if project.github}
							<a
								href={project.github}
								target="_blank"
								rel="noopener"
								aria-label={tr.projets.github}
								title={tr.projets.github}
								class="text-muted-foreground hover:text-foreground relative z-10 shrink-0 transition-colors"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"
									><path
										d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
									/></svg
								>
							</a>
						{/if}
					</div>
					<h3 class="group-hover:text-primary mb-2 font-semibold transition-colors">
						{project.title}
					</h3>
					<p class="text-muted-foreground text-sm">{project.desc[i18n.current]}</p>
					<div
						class="text-primary mt-4 flex items-center gap-1 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100"
					>
						{tr.projets.see}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-3 w-3"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg
						>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<section id="certifications" class="px-6 py-24">
	<div class="mx-auto max-w-5xl">
		<h2 class="reveal mb-4 text-3xl font-bold">{tr.certifications.title}</h2>
		<p class="text-muted-foreground reveal mb-6 max-w-xl delay-100">
			{tr.certifications.subtitle}
		</p>

		<div class="reveal mb-8 flex flex-wrap gap-2 delay-100">
			{#each certFilters as filter (filter)}
				<button
					type="button"
					aria-pressed={certFilter === filter}
					onclick={() => (certFilter = filter)}
					class="rounded-full px-3 py-1 text-sm transition-colors {certFilter === filter
						? 'bg-primary text-primary-foreground'
						: 'bg-muted text-muted-foreground hover:text-foreground'}"
				>
					{tr.certifications.filters[filter]}
				</button>
			{/each}
		</div>

		{#if !certifications.some((cert) => matchesCertFilter(cert.kind))}
			<p class="text-muted-foreground text-sm">{tr.certifications.empty}</p>
		{/if}

		<div class="grid gap-6 sm:grid-cols-2">
			<!-- Filtered cards stay in the DOM: the reveal observer only tracks elements present on mount -->
			{#each certifications as cert, i (cert.url)}
				<div
					hidden={!matchesCertFilter(cert.kind)}
					class="reveal bg-background group relative flex items-start gap-5 rounded-2xl border p-6 transition-shadow hover:shadow-md"
					style="transition-delay: {i * 80}ms"
				>
					<a
						href={cert.url}
						target="_blank"
						rel="noopener"
						class="absolute inset-0 z-0 rounded-2xl"
						aria-label="{cert.title} - {tr.certifications.verify}"
					></a>

					<img
						src="{base}/{cert.badge}"
						alt=""
						width="96"
						height="96"
						loading="lazy"
						class="h-20 w-20 shrink-0 sm:h-24 sm:w-24"
					/>
					<div class="min-w-0">
						<span class="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs">
							{tr.certifications.kinds[cert.kind]}
						</span>
						<h3 class="group-hover:text-primary mt-3 mb-1 font-semibold transition-colors">
							{cert.title}
						</h3>
						<p class="text-muted-foreground text-sm">
							{cert.issuer} · {issuedFormat.format(new Date(cert.issued))}
						</p>
						<p class="text-primary mt-3 text-xs font-medium">{tr.certifications.verify} ↗</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<section id="cv" class="bg-muted/40 px-6 py-24">
	<div class="mx-auto max-w-3xl">
		<h2 class="reveal mb-4 text-3xl font-bold">{tr.cv.title}</h2>
		<p class="text-muted-foreground reveal mb-6 max-w-xl delay-100">{tr.cv.subtitle}</p>

		<div class="reveal mb-8 flex flex-wrap gap-4 delay-100">
			<a
				href="{base}/cv/Louis_Michault_Resume.pdf"
				download
				class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-2.5 text-sm font-medium transition-colors"
			>
				{tr.cv.download}
			</a>
			<a
				href="{base}/cv/Louis_Michault_Resume.pdf"
				target="_blank"
				rel="noopener"
				class="border-border hover:bg-muted rounded-full border px-6 py-2.5 text-sm font-medium transition-colors"
			>
				{tr.cv.open} ↗
			</a>
		</div>

		<!-- Hidden on small screens, where embedded PDFs are unreliable: the buttons above remain -->
		<object
			data="{base}/cv/Louis_Michault_Resume.pdf#view=FitH"
			type="application/pdf"
			aria-label={tr.cv.viewer_label}
			class="reveal bg-background hidden aspect-[210/297] w-full rounded-2xl border md:block"
		>
			<p class="text-muted-foreground p-6 text-sm">{tr.cv.fallback}</p>
		</object>
	</div>
</section>

<section id="contact" class="px-6 py-24">
	<div class="mx-auto max-w-xl text-center">
		<h2 class="reveal mb-4 text-3xl font-bold">{tr.contact.title}</h2>
		<p class="text-muted-foreground reveal mb-10 delay-100">{tr.contact.subtitle}</p>

		{#if formSuccess}
			<Alert.Root class="reveal mb-6 border-green-200 bg-green-50 text-left dark:border-green-900 dark:bg-green-950">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
				<Alert.Title class="text-green-800 dark:text-green-200">{tr.contact.success_title}</Alert.Title>
				<Alert.Description class="text-green-700 dark:text-green-300">{tr.contact.success_desc}</Alert.Description>
			</Alert.Root>
		{/if}

		<form onsubmit={handleSubmit} class="reveal flex flex-col gap-4 text-left delay-200">
			{#if formError}
				<Alert.Root class="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
					<Alert.Title class="text-red-800 dark:text-red-200">{tr.contact.error_title}</Alert.Title>
					<Alert.Description class="text-red-700 dark:text-red-300">{formError}</Alert.Description>
				</Alert.Root>
			{/if}

			<fieldset disabled={submitting} class="contents">
				<div class="grid gap-4 sm:grid-cols-2">
					<div class="flex flex-col gap-1.5">
						<label for="name" class="text-sm font-medium">{tr.contact.name}</label>
						<input id="name" name="name" type="text" placeholder={tr.contact.name_ph}
							bind:value={fieldName} required
							class="border-input bg-background focus:ring-ring disabled:opacity-50 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2" />
					</div>
					<div class="flex flex-col gap-1.5">
						<label for="email" class="text-sm font-medium">{tr.contact.email}</label>
						<input id="email" name="email" type="email" placeholder={tr.contact.email_ph}
							bind:value={fieldEmail} required
							class="border-input bg-background focus:ring-ring disabled:opacity-50 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2" />
					</div>
				</div>
				<div class="flex flex-col gap-1.5">
					<label for="message" class="text-sm font-medium">{tr.contact.message}</label>
					<textarea id="message" name="message" rows="5" placeholder={tr.contact.message_ph}
						bind:value={fieldMessage} required
						class="border-input bg-background focus:ring-ring disabled:opacity-50 resize-none rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"></textarea>
				</div>
				{#if PUBLIC_TURNSTILE_SITE_KEY}
					<div class="flex flex-col items-center gap-1.5">
						<div
							class="cf-turnstile"
							data-sitekey={PUBLIC_TURNSTILE_SITE_KEY}
							data-callback="onTurnstileSuccess"
							data-expired-callback="onTurnstileExpired"
							data-theme="auto"
						></div>
						{#if turnstileError}
							<p class="text-xs text-red-500">{tr.contact.captcha_error}</p>
						{/if}
					</div>
				{/if}
					<button type="submit" disabled={submitting}
					class="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-70 flex items-center gap-2 self-center rounded-full px-6 py-2.5 text-sm font-medium transition-colors">
					{#if submitting}
						<svg class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
						</svg>
						{tr.contact.submitting}
					{:else}
						{tr.contact.submit}
					{/if}
				</button>
			</fieldset>
		</form>

		<div class="text-muted-foreground reveal mt-10 flex items-center justify-center gap-6 delay-300">
			<a
				href="mailto:contact@louis-michault.fr"
				class="hover:text-foreground flex items-center gap-1.5 text-sm transition-colors"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><rect width="20" height="16" x="2" y="4" rx="2" /><path
						d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
					/></svg
				>
				Email
			</a>
			<a
				href="https://github.com/Catsuri33"
				target="_blank"
				rel="noopener"
				class="hover:text-foreground flex items-center gap-1.5 text-sm transition-colors"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					viewBox="0 0 24 24"
					fill="currentColor"
					><path
						d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
					/></svg
				>
				GitHub
			</a>
			<a
				href="https://www.linkedin.com/in/louis-michault/"
				target="_blank"
				rel="noopener"
				class="hover:text-foreground flex items-center gap-1.5 text-sm transition-colors"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					viewBox="0 0 24 24"
					fill="currentColor"
					><path
						d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
					/></svg
				>
				LinkedIn
			</a>
		</div>
	</div>
</section>

<Footer />
