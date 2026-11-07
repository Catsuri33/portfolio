export type Project = {
	slug: string;
	title: string;
	tags: string[];
	github?: string;
	desc: { fr: string; en: string };
};

export const projects: Project[] = [
	{
		slug: 'portfolio',
		title: 'Portfolio',
		tags: ['SvelteKit', 'Tailwind'],
		github: 'https://github.com/Catsuri33/portfolio',
		desc: {
			fr: 'Ce site - landing page réalisée avec SvelteKit et shadcn-svelte.',
			en: 'This site - landing page built with SvelteKit and shadcn-svelte.'
		}
	},
	{
		slug: 'homelab',
		title: 'Homelab',
		tags: ['K3S', 'Hardware', 'Docker', 'Grafana', 'UptimeKuma'],
		desc: {
			fr: 'Réalisation d\'un homelab personnel. Montage des composants, installation de Kubernetes, déploiement de services (Grafana, UptimeKuma, Gitea…).',
			en: 'Personal homelab build: hardware assembly, Kubernetes setup, self-hosted services (Grafana, UptimeKuma, Gitea…).'
		}
	},
	{
		slug: 'omni',
		title: 'Omni',
		tags: ['TypeScript', 'React', 'Kubernetes', 'GitLab CI/CD'],
		desc: {
			fr: 'Projet d\'école : une suite collaborative auto-hébergeable et souveraine, comparable à Proton ou Google Workspace.',
			en: 'School project: a self-hostable, sovereign collaborative suite similar to Proton or Google Workspace.'
		}
	},
	{
		slug: 'french-car-scraper',
		title: 'FrenchCarScrapper',
		tags: ['Puppeteer', 'Scraping', 'Node.js', 'NPM Package'],
		github: 'https://github.com/Catsuri33/French-Car-Scraper',
		desc: {
			fr: 'Récupérer des informations sur une voiture française à partir de sa plaque d\'immatriculation.',
			en: 'Retrieve information about a French car from its licence plate number.'
		}
	},
	{
		slug: 'maktun-scraper',
		title: 'Maktun-Scraper',
		tags: ['Puppeteer', 'Scraping', 'Node.js'],
		github: 'https://github.com/Catsuri33/Maktun-Scraper',
		desc: {
			fr: 'Récupérer des informations sur sa collection de pièces (nombre, noms, descriptions, années...).',
			en: 'Retrieve information about a coins collection (number of coins, names, descriptions, years…).'
		}
	}
];
