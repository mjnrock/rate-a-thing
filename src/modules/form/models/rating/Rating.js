import { EnumElementType } from "../../EnumElementType";
import Element from "../Element";

export const RatingState = ({ as, value = null, ...rest } = {}) => {
	return {
		...Element.State({
			type: EnumElementType.RATING,
			as,
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