import Review from "./lib/Review";
import Rating from "./lib/Rating";

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
	/* Constructor-like functionality that also processes short-hand syntax */
	New: (next = {}) => {
		const ratings = Rating.Helpers.transformToRatingGroup(next.ratings);
		const n = Review.State({ ...next, ratings });

		n.ratings = Review.Helpers.transformToRatings(n.ratings);

		return n;
	},
	set: (state, next = {}) => {
		return next;
	},
	init: (state, next = {}) => {
		const ratings = Rating.Helpers.transformToRatingGroup(next.ratings);
		const n = Review.Reducers.merge(state, { ...next, ratings });

		n.ratings = Review.Helpers.transformToRatings(n.ratings);

		console.log(n)

		return n;
	},
	setRatingValue: (state, { id, value } = {}) => {
		let rating = Review.Helpers.findRatingById(state.ratings, id);
		if(rating) {
			if(rating.$type === Rating.EnumRatingType.DISCRETE_RANGE) {
				rating.current = value;
			} else if(rating.$type === Rating.EnumRatingType.MARKDOWN) {
				rating.content = value;
			}
		}

		return Review.Reducers.merge(state, { ratings: state.ratings });
	},
});

export const State = () => ({
	reviews: [],
});

export default {
	Transformers,
	Reducers: Reducers(),
	State,
};