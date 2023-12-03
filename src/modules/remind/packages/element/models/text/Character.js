import { EnumElementType, EnumElementAs } from "../../EnumElementType";
import Text from "./Text";

export const CharacterSchema = {
	value: EnumElementType.TEXT,
};

export const CharacterState = ({ ...rest } = {}) => {
	return {
		...Text.State({
			as: EnumElementAs[ EnumElementType.TEXT ].Character,
			state: {
				value: "",
			},
			...rest
		}),
	};
};

export const CharacterReducers = () => ({
	...Text.Reducers,
	setValue: (state, value) => {
		return {
			...state,
			state: {
				...state.state,
				value: (value).toString()[ 0 ],
			},
		};
	},
});

export default {
	State: CharacterState,
	Reducers: CharacterReducers(),
};