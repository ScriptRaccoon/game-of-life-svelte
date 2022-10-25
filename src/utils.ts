export function debounce(fn: () => void, delay: number) {
	let id: number;
	return () => {
		if (id) clearTimeout(id);
		id = window.setTimeout(() => {
			fn();
		}, delay);
	};
}
