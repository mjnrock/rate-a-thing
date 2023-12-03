import { EnumElementType } from "../../../element/EnumElementType";
import { EnumFormAs } from "../../EnumFormType";

import Array from "../../../element/models/array/Array";

export const DropdownState = ({ ...rest } = {}) => {
	return {
		...Array.State({
			as: EnumFormAs[ EnumElementType.ARRAY ].DROPDOWN,
		}),
		...rest
	};
};

export const DropdownReducers = () => ({
	...Array.Reducers,
});

export default {
	State: DropdownState,
	Reducers: DropdownReducers(),
};