import EnumElementType from "./EnumElementType";
import Element from "./Element";

export const RatingState = ({ current = null, max, min, step = 1, ...rest } = {}) => {
	return {
		...Element.State({
			type: EnumElementType.RATING,
			state: {
				current,
				max,
				min,
				step,
			},
		}),
		...rest,
	};
};

export const RatingReducers = () => ({
	...Element.Reducers(),
	setCurrent: (state, current) => {
		// ensure current is between min and max
		let nextCurrent = current;
		if(current < state.state.min) {
			nextCurrent = state.state.min;
		} else if(current > state.state.max) {
			nextCurrent = state.state.max;
		}

		// ensure current is a multiple of step
		const remainder = nextCurrent % state.state.step;
		if(remainder !== 0) {
			nextCurrent = nextCurrent - remainder;
		}

		return {
			...state,
			state: {
				...state.state,
				current: nextCurrent,
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