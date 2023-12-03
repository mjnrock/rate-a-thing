import { EnumElementType, EnumFormElementType } from "../../EnumElementType";
import Group from "./Group";

export const FormState = ({ ...rest } = {}) => {
	return {
		...Group.State({
			as: EnumFormElementType[ EnumElementType.GROUP ].FORM,
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