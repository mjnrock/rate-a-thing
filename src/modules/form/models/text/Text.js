import { EnumElementType } from "../../EnumElementType";
import Element from "../Element";

export const TextState = ({ ...rest } = {}) => {
	return {
		...Element.State({
			type: EnumElementType.TEXT,
			state: {
				value: "",
			},
		}),
		...rest
	};
};

export const TextReducers = () => ({
	...Element.Reducers,
	setValue: (state, value) => ({
		...state,
		state: {
			...state.state,
			value: value.toString(),
		},
	}),
});

export default {
	State: TextState,
	Reducers: TextReducers(),
};