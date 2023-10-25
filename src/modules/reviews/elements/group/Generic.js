import EnumElementType from "../../lib/EnumElementType";
import EnumElementSubType from "../../lib/EnumElementSubType";
import Element from "../../lib/Element";

export const State = (members, { name, ...rest } = {}) => ({
	...Element.State(members, {
		type: EnumElementType.Group,
		subtype: EnumElementSubType.Group.Generic,
		name,
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