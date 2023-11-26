import { EnumElementType, EnumFormElementType } from "../../EnumElementType";
import Text from "./Text";

export const HeadingSchema = {
	value: EnumElementType.TEXT,
	size: [ EnumElementType.ARRAY, EnumFormElementType[ EnumElementType.ARRAY ].DROPDOWN, "h1", "h2", "h3", "h4", "h5", "h6" ],
};

export const HeadingState = ({ ...rest } = {}) => {
	return {
		...Text.State({
			as: EnumFormElementType[ EnumElementType.TEXT ].HEADING,
			state: {
				value: "",
				size: "h1",
			},
			...rest
		}),
	};
};

export const HeadingReducers = () => ({
	...Text.Reducers,
	setValue: (state, value) => ({
		...state,
		state: {
			...state.state,
			value: value.toString(),
		},
	}),
});

export default {
	State: HeadingState,
	Reducers: HeadingReducers(),
};