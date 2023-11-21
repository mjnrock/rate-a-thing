import { EnumElementType, EnumFormElementType } from "../../EnumElementType";
import Input from "./Input";

export const MarkdownState = ({ content = "", ...rest } = {}) => {
	return {
		...Input.State({
			as: EnumFormElementType[ EnumElementType.INPUT ].MARKDOWN,
		}),
		...rest,
	};
};

export const MarkdownReducers = () => ({
	...Input.Reducers,
	setContent: (state, content) => ({
		...state,
		state: {
			...state.state,
			content,
		},
	}),
});

export default {
	State: MarkdownState,
	Reducers: MarkdownReducers(),
};