## Context

This portfolio is the site you're currently browsing. The goal was to have a simple, fast showcase that's easy to maintain, without relying on a CMS.

## Tech stack

- **SvelteKit** with static rendering (`adapter-static`), deployed on GitHub Pages.
- **Tailwind CSS v4** for styling, with components inspired by shadcn-svelte.
- A small hand-rolled i18n system (FR/EN) built on Svelte 5 runes.
- A contact form wired to Formspree, protected by Cloudflare Turnstile.

## Features

- Light/dark theme and language preference persisted in `localStorage`.
- Scroll-triggered reveal animations via `IntersectionObserver`.
- A Projects section that links to detailed articles (the one you're reading!) instead of directly to GitHub.

## Going further

The code is open source and available on GitHub, feel free to take a look or use it as inspiration.
