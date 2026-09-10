## Contexte

Ce portfolio est le site que vous êtes en train de consulter. L'objectif était d'avoir une vitrine simple, rapide et facile à faire évoluer, sans dépendre d'un CMS.

## Stack technique

- **SvelteKit** avec le rendu statique (`adapter-static`), déployé sur GitHub Pages.
- **Tailwind CSS v4** pour le style, avec des composants inspirés de shadcn-svelte.
- Un petit système d'i18n fait main (FR/EN) basé sur le state runes de Svelte 5.
- Un formulaire de contact branché sur Formspree, protégé par Cloudflare Turnstile.

## Fonctionnalités

- Thème clair/sombre et langue persistés en `localStorage`.
- Animations d'apparition au scroll via `IntersectionObserver`.
- Une section Projets qui pointe vers des articles détaillés (celui que vous lisez !) plutôt que directement vers GitHub.

## Pour aller plus loin

Le code est open source et disponible sur GitHub, n'hésitez pas à jeter un œil ou à vous en inspirer.
