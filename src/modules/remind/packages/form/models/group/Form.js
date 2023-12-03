import { EnumElementType } from "../../../element/EnumElementType";
import { EnumFormAs } from "../../EnumFormType";

import Group from "../../../element/models/group/Group";

export const FormState = ({ ...rest } = {}) => {
	return {
		...Group.State({
			as: EnumFormAs[ EnumElementType.GROUP ].FORM,
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