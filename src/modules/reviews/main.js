export const Reducers = () => ({
	fn: (state, { id, value } = {}) => {
		
	},
});

export const State = ({ reviews = [], ...rest } = {}) => ({
	reviews,
	...rest,
});

export default {
	Reducers: Reducers(),
	State,
};