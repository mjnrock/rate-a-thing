import EnumElementSubType from "../../lib/EnumElementSubType";
import Generic from "./Generic";

export const State = (elements, { ...rest } = {}) => ({
	...Generic.State(elements, {
		subtype: EnumElementSubType.Group.Section,
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