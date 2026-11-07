import { defineParams } from '@sveltejs/kit/params';

const matchLang = (param: string) => param === 'en';

export const params = defineParams({
	lang: (param) => (matchLang(param) ? param : undefined)
});
