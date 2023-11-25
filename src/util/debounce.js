export function debounce(func, wait) {
	if(wait === 0) {
		return func;
	}

	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

export default {
	debounce,
};