import { EnumElementType, EnumFormElementType } from "../../EnumElementType";
import Text from "./Text";

export const MarkdownSchema = {
	value: EnumElementType.TEXT,
};

export const MarkdownState = ({ ...rest } = {}) => {
	return {
		...Text.State({
			as: EnumFormElementType[ EnumElementType.TEXT ].MARKDOWN,
			...rest
		}),
	};
};

export const MarkdownReducers = () => ({
	...Text.Reducers,
});

export default {
	Schema: MarkdownSchema,
	State: MarkdownState,
	Reducers: MarkdownReducers(),
};