import { EnumElementType, EnumElementSubType } from "../../EnumElementType";
import Input from "./Input";

export const MarkdownState = ({ content = "", ...rest } = {}) => {
	return {
		...Input.State({
			subType: EnumElementSubType[ EnumElementType.INPUT ].MARKDOWN,
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