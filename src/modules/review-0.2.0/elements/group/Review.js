import EnumElementSubType from "../../lib/EnumElementSubType";
import Generic from "./Generic";

export const State = (elements, { name, ...rest } = {}) => ({
	...Generic.State(elements, {
		subtype: EnumElementSubType.Group.Review,
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