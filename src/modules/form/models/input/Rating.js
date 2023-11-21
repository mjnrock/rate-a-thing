import { EnumElementType, EnumFormElementType } from "../../EnumElementType";
import Input from "./Input";

export const RatingState = ({ value = null, max, min, step = 1, ...rest } = {}) => {
	return {
		...Input.State({
			as: EnumFormElementType[ EnumElementType.INPUT ].RATING,
			state: {
				value,
				max,
				min,
				step,
			},
		}),
		...rest,
	};
};

export const RatingReducers = () => ({
	...Input.Reducers,
	setValue: (state, value) => {
		// ensure value is between min and max
		let nextValue = value;
		if(value < state.state.min) {
			nextValue = state.state.min;
		} else if(value > state.state.max) {
			nextValue = state.state.max;
		}

		// ensure value is a multiple of step
		const remainder = nextValue % state.state.step;
		if(remainder !== 0) {
			nextValue = nextValue - remainder;
		}

		return {
			...state,
			state: {
				...state.state,
				value: nextValue,
			},
		};
	},
	setMax: (state, max) => ({
		...state,
		state: {
			...state.state,
			max,
		},
	}),
	setMin: (state, min) => ({
		...state,
		state: {
			...state.state,
			min,
		},
	}),
	setStep: (state, step) => ({
		...state,
		state: {
			...state.state,
			step,
		},
	}),
});

export default {
	State: RatingState,
	Reducers: RatingReducers(),
};