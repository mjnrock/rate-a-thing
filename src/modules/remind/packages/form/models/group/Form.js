import { EnumElementType } from "../../../element/EnumType";
import { EnumFormAs } from "../../EnumType";

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