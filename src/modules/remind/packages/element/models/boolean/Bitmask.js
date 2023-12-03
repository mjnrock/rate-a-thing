import { EnumElementType, EnumElementAs } from "../../EnumElementType";
import Boolean from "./Boolean";

export const BitmaskState = ({ ...rest } = {}) => {
	return {
		...Boolean.State({
			as: EnumElementAs[ EnumElementType.BOOLEAN ].BITMASK,
			state: {
				value: 0,
			},
		}),
		...rest
	};
};

export const BitmaskReducers = () => ({
	...Boolean.Reducers,
	setValue: (state, value) => ({
		...state,
		state: {
			...state.state,
			value: parseInt(value, 10),
		},
	}),
	toggle: (state, value) => ({
		...state,
		state: {
			...state.state,
			value: state.state.value ^ value,
		},
	}),
	untoggle: (state, value) => ({
		...state,
		state: {
			...state.state,
			value: state.state.value & ~value,
		},
	}),
	toggleMany: (state, values) => ({
		...state,
		state: {
			...state.state,
			value: values.reduce((value, next) => value ^ next, state.state.value),
		},
	}),
	untoggleMany: (state, values) => ({
		...state,
		state: {
			...state.state,
			value: values.reduce((value, next) => value & ~next, state.state.value),
		},
	}),
	invert: (state) => ({
		...state,
		state: {
			...state.state,
			value: ~state.state.value,
		},
	}),
});

export default {
	State: BitmaskState,
	Reducers: BitmaskReducers(),
};