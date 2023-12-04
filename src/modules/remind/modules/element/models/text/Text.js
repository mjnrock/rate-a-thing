import { EnumElementType } from "../../EnumType";
import Element from "../Element";

export const TextSchema = {
	value: EnumElementType.TEXT,
};

export const TextState = ({ ...rest } = {}) => {
	return {
		...Element.State({
			type: EnumElementType.TEXT,
			state: {
				value: "",
			},
			...rest
		}),
	};
};

export const TextReducers = () => ({
	...Element.Reducers,
	setValue: (state, value) => ({
		...state,
		state: {
			...state.state,
			value: (value).toString(),
		},
	}),
});

export default {
	Schema: TextSchema,
	State: TextState,
	Reducers: TextReducers(),
};