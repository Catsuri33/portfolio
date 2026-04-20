type Theme = 'light' | 'dark' | 'system';

function createTheme() {
	let current = $state<Theme>('system');

	function apply(theme: Theme) {
		const dark =
			theme === 'dark' ||
			(theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
		document.documentElement.classList.toggle('dark', dark);
	}

	function set(theme: Theme) {
		current = theme;
		localStorage.setItem('theme', theme);
		apply(theme);
	}

	function init() {
		const stored = (localStorage.getItem('theme') as Theme) ?? 'system';
		current = stored;
		apply(stored);

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
			if (current === 'system') apply('system');
		});
	}

	return { get current() { return current; }, set, init };
}

export const theme = createTheme();
