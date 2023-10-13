import Chord from "@lespantsfancy/chord";

import Rating, { EnumRatingType } from "./Rating";
import Group from "./Group";
import Markdown from "./Markdown";

export const Helpers = {
	transformToRatings: (input) => {
		const transformed = [];

		if(Array.isArray(input)) {
			input.forEach(item => {
				if(item.$type === EnumRatingType.GROUP) {
					const transformedChildren = Helpers.transformToRatings(item.children);
					transformed.push(Group.State({ ...item, children: transformedChildren }));
				} else if(item.$type === EnumRatingType.MARKDOWN) {
					transformed.push(Markdown.State(item));
				} else {
					transformed.push(Rating.State(item));
				}
			});
		} else {
			if(input.$type === EnumRatingType.GROUP) {
				const transformedChildren = Helpers.transformToRatings(input.children);
				transformed.push(Group.State({ ...input, children: transformedChildren }));
			} else if(input.$type === EnumRatingType.MARKDOWN) {
				transformed.push(Markdown.State(input));
			} else {
				transformed.push(Rating.State(input));
			}
		}

		return transformed;
	},
	findRatingById: (schema, id) => {
		for(let i = 0; i < schema.length; i++) {
			const item = schema[ i ];

			if(item.$id === id) {
				return item;
			}

			if(item.$type === EnumRatingType.GROUP && Array.isArray(item.children)) {
				const found = Helpers.findRatingById(item.children, id);
				if(found) return found;
			}
		}

		return null;
	},
};

export const Reducers = ({ ...args } = {}) => ({
	/* Constructor-like functionality that also processes short-hand syntax */
	New: (next = {}) => {
		const ratings = Rating.Helpers.transformToRatingGroup(next.ratings);
		const n = Review.State({ ...next, ratings });

		n.ratings = Review.Helpers.transformToRatings(n.ratings);

		return n;
	},
	merge: (state, next = {}) => ({ ...state, ...next }),
	setRatings: (state, ratings) => ({ ...state, ratings }),
	setRatingValue: (state, { id, value } = {}) => {
		let rating = Helpers.findRatingById(state.ratings, id);
		if(rating) {
			if(rating.$type === Rating.EnumRatingType.DISCRETE_RANGE) {
				rating.current = value;
			} else if(rating.$type === Rating.EnumRatingType.MARKDOWN) {
				rating.content = value;
			}
		}

		return Reducers(args).merge(state, { ratings: state.ratings });
	},
	addRating: (state, rating) => ({ ...state, ratings: [ ...state.ratings, rating ] }),
	removeRating: (state, rating) => ({ ...state, ratings: state.ratings.filter(c => c !== rating) }),
	swapRatings: (state, ratingA, ratingB) => {
		let ratings = state.ratings.slice();

		let indexA = ratings.indexOf(ratingA);
		let indexB = ratings.indexOf(ratingB);

		if(indexA > -1 && indexB > -1) {
			ratings[ indexA ] = ratingB;
			ratings[ indexB ] = ratingA;
		}

		return {
			...state,
			ratings,
		};
	},
});

export const Review = ({ $type = EnumRatingType.REVIEW, ratings = [], ...rest } = {}) => Chord.Node.Identity.Next({
	$type,
	ratings,
	...rest,
});

export default {
	Helpers,
	Reducers: Reducers(),
	State: Review,
};