import EnumElementType from "./EnumElementType";
import Element from "./Element";

export const MarkdownState = ({ content = "", ...rest } = {}) => {
    return {
		...Element.State({
			type: EnumElementType.MARKDOWN,
			state: {
				content,
			},
		}),
		...rest,
    };
};

export const MarkdownReducers = () => ({
	...Element.Reducers(),
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