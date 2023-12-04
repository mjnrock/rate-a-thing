import { EnumElementType } from "../../EnumType";
import Element from "../Element";

export const ObjectState = ({ ...rest } = {}) => {
	return {
		...Element.State({
			type: EnumElementType.OBJECT,
			state: {
				value: {},
			},
		}),
		...rest
	};
};

export const ObjectReducers = () => ({
	...Element.Reducers,
	setValue: (state, value = {}) => ({
		...state,
		state: {
			...state.state,
			value,
		},
	}),
	setKeyValue: (state, key, value) => ({
		...state,
		state: {
			...state.state,
			value: {
				...state.state.value,
				[ key ]: value,
			},
		},
	}),
});

export default {
	State: ObjectState,
	Reducers: ObjectReducers(),
};