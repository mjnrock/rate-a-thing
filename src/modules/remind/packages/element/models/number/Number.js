import { EnumElementType } from "../../EnumElementType";
import Element from "../Element";

export const NumberSchema = {
	value: EnumElementType.NUMBER,
};

export const NumberState = ({ ...rest } = {}) => {
	return {
		...Element.State({
			type: EnumElementType.NUMBER,
			state: {
				value: null,
			},
		}),
		...rest
	};
};

export const NumberReducers = () => ({
	...Element.Reducers,
	setValue: (state, value) => ({
		...state,
		state: {
			...state.state,
			value: parseFloat(value),
		},
	}),
});

export default {
	Schema: NumberSchema,
	State: NumberState,
	Reducers: NumberReducers(),
};