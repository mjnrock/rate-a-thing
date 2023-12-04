import { EnumElementType } from "../../EnumType";
import Element from "../Element";

export const BooleanState = ({ ...rest } = {}) => {
	return {
		...Element.State({
			type: EnumElementType.BOOLEAN,
			state: {
				value: null,
			},
		}),
		...rest
	};
};

export const BooleanReducers = () => ({
	...Element.Reducers,
	setValue: (state, value) => ({
		...state,
		state: {
			...state.state,
			value: !!value,
		},
	}),
	toggle: (state) => ({
		...state,
		state: {
			...state.state,
			value: !state.state.value,
		},
	}),
});

export default {
	State: BooleanState,
	Reducers: BooleanReducers(),
};