import { v4 as uuid, validate } from "uuid";
import { EnumElementType, EnumElementAs } from "../../EnumElementType";
import Text from "./Text";

export const UUIDSchema = {
	value: EnumElementType.TEXT,
};

export const UUIDState = ({ ...rest } = {}) => {
	return {
		...Text.State({
			as: EnumElementAs[ EnumElementType.TEXT ].UUID,
			state: {
				value: uuid(),
				version: 4,
			},
			...rest
		}),
	};
};

export const UUIDReducers = () => ({
	...Text.Reducers,
	reseedValue: (state) => ({
		...state,
		state: {
			...state.state,
			value: uuid(),
		},
	}),
	setValue: (state, value) => {
		if(validate(value)) {
			return {
				...state,
				state: {
					...state.state,
					value: (value).toString(),
				},
			};
		}

		return state;
	},
	setVersion: (state, version) => ({
		...state,
		state: {
			...state.state,
			version: version,
		},
	}),
});

export default {
	State: UUIDState,
	Reducers: UUIDReducers(),
};