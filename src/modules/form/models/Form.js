import EnumElementType from "../EnumElementType";
import Group from "./Group";

export const FormState = ({ ...rest } = {}) => {
	return {
		...Group.State({
			type: EnumElementType.FORM,
			state: {
				elements: [],
			},
		}),
		...rest,
	};
};

export const FormReducers = () => ({
	...Group.Reducers,
});

export default {
	State: FormState,
	Reducers: FormReducers(),
};