export const Transformers = {
	toJson: (state = {}) => {
		return JSON.stringify(state);
	},
	fromJson: (json = []) => {
		const state = typeof json === "object" ? json : JSON.parse(json);
		
		const New = Reducers().New;
		state.reviews = state.reviews.map(review => {
			return New(review);
		});

		return state;
	},
};

export const Reducers = () => ({
	updateReview: (state, { id, value } = {}) => {
		// first, find the review
		const index = state.reviews.findIndex(r => r.$id === id);

		// if the review is not found, return the state
		if(index === -1) return state;

		// otherwise, update the review
		state.reviews[ index ].value = value;

		// return the new state
		return {
			...state,
			reviews: [
				...state.reviews,
			],
		};
	},
});

export const State = ({ reviews = [] } = {}) => ({
	reviews,
});

export default {
	Transformers,
	Reducers: Reducers(),
	State,
};