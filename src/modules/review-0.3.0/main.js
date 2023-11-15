export const Helpers = {};

export const State = ({ ...rest } = {}) => {
	return {
		...rest,
	};
};

export const Reducers = () => ({
	set: (state, next) => next,
	merge: (state, next) => ({ ...state, ...next }),
});
export const Effects = () => ({});

export default {
	State,
	Reducers: Reducers(),
	Effects: Effects(),
	Helpers,
};