import EnumElementType from "../../lib/EnumElementType";
import EnumElementSubType from "../../lib/EnumElementSubType";
import Element from "../../lib/Element";

export const State = (value, { ...rest } = {}) => ({
	...Element.State(value, {
		type: EnumElementType.Markdown,
		subtype: EnumElementSubType.Markdown.Content,
		...rest,
	}),
});

export const Reducers = () => ({
	...Element.Reducers,
});

export default {
	State,
	Reducers: Reducers(),
};