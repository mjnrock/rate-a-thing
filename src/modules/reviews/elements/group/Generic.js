import EnumElementType from "../../lib/EnumElementType";
import EnumElementSubType from "../../lib/EnumElementSubType";
import Element from "../../lib/Element";

export const State = (members, { ...rest } = {}) => ({
	...Element.State(members, {
		type: EnumElementType.Group,
		subtype: EnumElementSubType.Group.Generic,
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