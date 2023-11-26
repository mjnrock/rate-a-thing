import { EnumElementType, EnumFormElementType } from "../../EnumElementType";
import Rating from "./Rating";

export const RangeSchema = {
	value: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ],
	max: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ],
	min: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ],
	step: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ],
	icon: [ EnumElementType.ARRAY, EnumFormElementType[ EnumElementType.ARRAY ].DROPDOWN, "star", "circle", "square", ],
};

export const RangeState = ({ value = null, max = 5, min = 1, step = 1, ...rest } = {}) => {
	return {
		...Rating.State({
			as: EnumFormElementType[ EnumElementType.RATING ].RANGE,
			state: {
				value,
				max,
				min,
				step,
				icon: "star",
			},
			...rest,
		}),
	};
};

export const RatingReducers = () => ({
	...Rating.Reducers,
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
	Schema: RangeSchema,
	State: RangeState,
	Reducers: RatingReducers(),
};