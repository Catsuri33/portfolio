export type Lang = 'fr' | 'en';

function createI18n() {
	let current = $state<Lang>('fr');

	function set(lang: Lang) {
		current = lang;
		localStorage.setItem('lang', lang);
		document.documentElement.setAttribute('lang', lang);
	}

	function init() {
		const stored = (localStorage.getItem('lang') as Lang) ?? 'fr';
		current = stored;
		document.documentElement.setAttribute('lang', stored);
	}

	return { get current() { return current; }, set, init };
}

export const i18n = createI18n();

export const t = {
	fr: {
		nav: { experience: 'Parcours', projets: 'Projets', contact: 'Contact' },
		hero: {
			role: 'Apprenti Ingénieur DevOps',
			desc: 'Étudiant en apprentissage à Polytech Montpellier et employé chez Tiria',
			cta_projects: 'Voir mes projets',
			cta_contact: 'Me contacter'
		},
		experience: { title: 'Parcours' },
		projets: {
			title: 'Projets',
			subtitle: 'Une sélection de réalisations personnelles et professionnelles.',
			see: 'Voir le projet'
		},
		contact: {
			title: 'Contact',
			subtitle: "Une idée de projet ? Une opportunité ? N'hésitez pas à me contacter.",
			name: 'Nom', name_ph: 'Votre nom',
			email: 'Email', email_ph: 'votre@email.com',
			message: 'Message', message_ph: 'Votre message',
			submit: 'Envoyer', submitting: 'Envoi en cours',
			success_title: 'Message envoyé !',
			success_desc: 'Je vous répondrai dans les plus brefs délais.',
			error_title: 'Erreur',
			network_error: 'Erreur réseau. Vérifiez votre connexion.',
			send_error: "Erreur lors de l'envoi. Réessayez plus tard."
		}
	},
	en: {
		nav: { experience: 'Career', projets: 'Projects', contact: 'Contact' },
		hero: {
			role: 'DevOps Engineering Apprentice',
			desc: 'Apprentice student at Polytech Montpellier, employed at Tiria',
			cta_projects: 'View my projects',
			cta_contact: 'Contact me'
		},
		experience: { title: 'Career' },
		projets: {
			title: 'Projects',
			subtitle: 'A selection of personal and professional work.',
			see: 'View project'
		},
		contact: {
			title: 'Contact',
			subtitle: 'Have a project idea or an opportunity? Feel free to reach out.',
			name: 'Name', name_ph: 'Your name',
			email: 'Email', email_ph: 'your@email.com',
			message: 'Message', message_ph: 'Your message\u2026',
			submit: 'Send', submitting: 'Sending\u2026',
			success_title: 'Message sent!',
			success_desc: "I'll get back to you as soon as possible.",
			error_title: 'Error',
			network_error: 'Network error. Please check your connection.',
			send_error: 'Error sending message. Please try again later.'
		}
	}
} as const;
