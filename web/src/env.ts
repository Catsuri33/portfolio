import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PUBLIC_FORMSPREE_ID: { public: true, static: true },
	PUBLIC_TURNSTILE_SITE_KEY: { public: true, static: true }
});
