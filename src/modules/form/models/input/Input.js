import { EnumElementType } from "../../EnumElementType";
import Element from "../Element";

export const InputState = ({ ...rest } = {}) => {
	return {
		...Element.State({
			type: EnumElementType.INPUT,
			state: {
				value: "",
			},
		}),
		...rest
	};
};

export const InputReducers = () => ({
	...Element.Reducers,
	setInputType: (state, inputType) => ({
		...state,
		state: {
			...state.state,
			inputType,
		},
	}),
	setValue: (state, value) => ({
		...state,
		state: {
			...state.state,
			value,
		},
	}),
});

export default {
	State: InputState,
	Reducers: InputReducers(),
};