import { EnumElementType, EnumFormElementType } from "../../EnumElementType";
import Text from "./Text";

export const CodeSchema = {
	value: EnumElementType.TEXT,
	lang: [ EnumElementType.ARRAY, EnumFormElementType[ EnumElementType.ARRAY ].DROPDOWN, "js", "css", "html", "json", "jsx" ],
};

export const CodeState = ({ ...rest } = {}) => {
	return {
		...Text.State({
			as: EnumFormElementType[ EnumElementType.TEXT ].Code,
			state: {
				value: "",
				lang: "javascript",
			},
			...rest
		}),
	};
};

export const CodeReducers = () => ({
	...Text.Reducers,
	setValue: (state, value) => ({
		...state,
		state: {
			...state.state,
			value: value.toString(),
		},
	}),
	setLanguage: (state, lang) => ({
		...state,
		state: {
			...state.state,
			lang: lang.toString(),
		},
	}),
});

export default {
	State: CodeState,
	Reducers: CodeReducers(),
};