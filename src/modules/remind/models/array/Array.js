import { EnumElementType } from "../../EnumElementType";
import Element from "../Element";

export const ArrayState = ({ ...rest } = {}) => {
	return {
		...Element.State({
			type: EnumElementType.ARRAY,
			state: {
				value: [],
			},
		}),
		...rest
	};
};

export const ArrayReducers = () => ({
	...Element.Reducers,
	setValue: (state, value = []) => ({
		...state,
		state: {
			...state.state,
			value,
		},
	}),
	append: (state, value) => ({
		...state,
		state: {
			...state.state,
			value: [ ...state.state.value, value ],
		},
	}),
	prepend: (state, value) => ({
		...state,
		state: {
			...state.state,
			value: [ value, ...state.state.value ],
		},
	}),
	setAtIndex: (state, index, value) => {
		const newValue = [ ...state.state.value ];

		newValue[ index ] = value;

		return {
			...state,
			state: {
				...state.state,
				value: newValue,
			},
		};

	},
	removeAtIndex: (state, index) => {
		const value = [ ...state.state.value ];

		value.splice(index, 1);

		return {
			...state,
			state: {
				...state.state,
				value,
			},
		};
	},
	swap: (state, indexA, indexB) => {
		const value = [ ...state.state.value ];
		const temp = value[ indexA ];

		value[ indexA ] = value[ indexB ];
		value[ indexB ] = temp;

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
	State: ArrayState,
	Reducers: ArrayReducers(),
};