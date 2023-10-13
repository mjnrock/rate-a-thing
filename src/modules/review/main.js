import Review from "./lib/Review";
import Rating from "./lib/Rating";

export const Reducers = () => ({
	New: (next = {}) => {
		const ratings = Rating.Helpers.transformToRatingGroup(next.ratings);
		const n = Review.State({ ...next, ratings });

		n.ratings = Review.Helpers.transformToRatings(n.ratings);

		return n;
	},
	init: (state, next = {}) => {
		const ratings = Rating.Helpers.transformToRatingGroup(next.ratings);
		const n = Review.Reducers.merge(state, { ...next, ratings });

		n.ratings = Review.Helpers.transformToRatings(n.ratings);

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
	...Review.State(),
});

export default {
	Reducers: Reducers(),
	State,
};