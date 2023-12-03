import { EnumElementType } from "../../../element/EnumElementType";

import Element from "../../../element/models/Element";

export const RatingState = ({ value = null, ...rest } = {}) => {
	return {
		...Element.State({
			type: EnumElementType.RATING,
			state: {
				value,
			},
			...rest,
		}),
	};
};

export const RatingReducers = () => ({
	...Element.Reducers,
	setValue: (state, value) => {
		return {
			...state,
			state: {
				...state.state,
				value,
			},
		};
	},
});

export default {
	State: RatingState,
	Reducers: RatingReducers(),
};