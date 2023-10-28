import Chord from "@lespantsfancy/chord";

import Group from "./Group";

export const EnumRatingType = {
	REVIEW: "REVIEW",
	GROUP: "GROUP",
	DISCRETE_RANGE: "DISCRETE_RANGE",
	CONTINUOUS_RANGE: "CONTINUOUS_RANGE",
	MARKDOWN: "MARKDOWN",
};

export const Helpers = {
	transformToRatingGroup: (schema) => {
		const transformed = [];
	
		schema.forEach(item => {
			if (Array.isArray(item)) {
				const transformedChildren = Helpers.transformToRatingGroup(item);
				// console.log(Group.State({ children: transformedChildren }));
				transformed.push({
					$type: EnumRatingType.GROUP,
					children: transformedChildren
				});
			} else if (item.hasOwnProperty("children") && Array.isArray(item.children)) {
				const transformedChildren = Helpers.transformToRatingGroup(item.children);
				transformed.push({
					...item,
					children: transformedChildren
				});
			} else {
				transformed.push(item);
			}
		});
	
		return transformed;
	},
};

export const Reducers = ({ } = {}) => ({
	merge: (state, next = {}) => ({ ...state, ...next }),
	setType: (state, type) => ({ ...state, type }),
	setCurrent: (state, current) => ({ ...state, current }),
	setOptions: (state, options) => ({ ...state, options }),
});

export const Rating = ({ $type = EnumRatingType.DISCRETE_RANGE, ...rest } = {}) => Chord.Node.Identity.Next({
	$type,
	current: null,
	options: [ 1, 2, 3, 4, 5 ],
	...rest,
});

export default {
	EnumRatingType,
	Helpers,
	Reducers: Reducers(),
	State: Rating,
};