import Chord from "@lespantsfancy/chord";

import Review from "./lib/Review";
import Rating from "./lib/Rating";

export const Reducers = {
	review: {
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
	},
};

export const Nodes = Chord.Node.Node.CreateMany({
	review: {
		state: Review.State(),
		reducers: Reducers.review,
		effects: {
			init: (...args) => {
				console.log("init", ...args);
			},
			setRatingValue: (...args) => {
				console.log("setRatingValue", ...args);
			}
		}
	},
});

export default {
	Reducers,
	Nodes,
};