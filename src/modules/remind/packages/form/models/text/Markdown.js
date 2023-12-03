import { EnumElementType } from "../../../element/EnumElementType";
import { EnumFormAs } from "../../EnumFormType";

import Text from "../../../element/models/text/Text";

export const MarkdownSchema = {
	value: EnumElementType.TEXT,
};

export const MarkdownState = ({ ...rest } = {}) => {
	return {
		...Text.State({
			as: EnumFormAs[ EnumElementType.TEXT ].MARKDOWN,
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