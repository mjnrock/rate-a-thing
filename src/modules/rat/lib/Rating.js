import Chord from "@lespantsfancy/chord";

export const EnumRatingType = {
	DISCRETE_RANGE: "DISCRETE_RANGE",
	CONTINUOUS_RANGE: "CONTINUOUS_RANGE",
	MARKDOWN: "MARKDOWN",
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
	Reducers,
	State: Rating,
};