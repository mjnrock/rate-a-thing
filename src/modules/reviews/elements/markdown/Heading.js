import EnumElementType from "../../lib/EnumElementType";
import EnumElementSubType from "../../lib/EnumElementSubType";
import Element from "../../lib/Element";

export const State = ({ ...rest } = {}) => ({
	...Element.State({
		type: EnumElementType.Markdown,
		subtype: EnumElementSubType.$ByKeys("Markdown", "Heading"),
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