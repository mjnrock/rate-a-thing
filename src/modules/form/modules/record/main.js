export const Helpers = {};

export const State = ({ active = {}, ...rest } = {}) => {
	return {
		active,
		...rest,
	};
};

export const Reducers = () => ({
	set: (state, next) => next,
	merge: (state, next) => ({ ...state, ...next }),
	setActive: (state, active) => ({ ...state, active }),
});
export const Effects = () => ({});

export default {
	State,
	Reducers: Reducers(),
	Effects: Effects(),
	Helpers,
};