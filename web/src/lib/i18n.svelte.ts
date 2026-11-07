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
		nav: { experience: 'Parcours', projets: 'Projets', certifications: 'Formations', cv: 'CV', contact: 'Contact' },
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
			see: "Lire l'article",
			github: 'Voir sur GitHub',
			back: 'Retour aux projets',
			not_found: "Cet article n'existe pas."
		},
		certifications: {
			title: 'Formations & certifications',
			subtitle: 'Les formations que j\'ai validées, vérifiables sur Credly.',
			verify: 'Vérifier sur Credly',
			kinds: { course: 'Cours', certification: 'Certification' },
			filters: { all: 'Tous', course: 'Cours', certification: 'Certifications' },
			empty: 'Aucune certification pour le moment.'
		},
		cv: {
			title: 'CV',
			subtitle: 'Mon CV en anglais, à consulter ici ou à télécharger.',
			download: 'Télécharger le PDF',
			open: 'Ouvrir le PDF',
			viewer_label: 'Aperçu du CV de Louis Michault',
			fallback: "Votre navigateur ne peut pas afficher le PDF ici. Utilisez les boutons ci-dessus pour l'ouvrir ou le télécharger."
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
			send_error: "Erreur lors de l'envoi. Réessayez plus tard.",
			captcha_error: 'Veuillez compléter la vérification.'
		},
		not_found: {
			title: 'Page introuvable',
			desc: "La page que vous cherchez n'existe pas ou a été déplacée.",
			back: "Retour à l'accueil"
		}
	},
	en: {
		nav: { experience: 'Career', projets: 'Projects', certifications: 'Training', cv: 'Resume', contact: 'Contact' },
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
			see: 'Read the article',
			github: 'View on GitHub',
			back: 'Back to projects',
			not_found: "This article doesn't exist."
		},
		certifications: {
			title: 'Training & certifications',
			subtitle: 'The courses I have completed, verifiable on Credly.',
			verify: 'Verify on Credly',
			kinds: { course: 'Course', certification: 'Certification' },
			filters: { all: 'All', course: 'Courses', certification: 'Certifications' },
			empty: 'No certifications yet.'
		},
		cv: {
			title: 'Resume',
			subtitle: 'View my resume here or download it.',
			download: 'Download PDF',
			open: 'Open PDF',
			viewer_label: "Preview of Louis Michault's resume",
			fallback: "Your browser can't display the PDF here. Use the buttons above to open or download it."
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
			send_error: 'Error sending message. Please try again later.',
			captcha_error: 'Please complete the verification.'
		},
		not_found: {
			title: 'Page not found',
			desc: "The page you're looking for doesn't exist or has been moved.",
			back: 'Back to home'
		}
	}
} as const;
