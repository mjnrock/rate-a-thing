export const Reducers = () => ({
	fn: (state, { id, value } = {}) => {
		
	},
});

export const State = ({ reviews = [] } = {}) => ({
	reviews,
});

export default {
	Reducers: Reducers(),
	State,
};