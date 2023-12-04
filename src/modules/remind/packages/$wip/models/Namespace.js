//TODO: Convert over to package/module format

import { EnumElementType, EnumFormElementType } from "../EnumType";
import Group from "../group/Group";

export const NamespaceState = ({ ...rest } = {}) => {
	return {
		...Group.State({
			// Create a new EnumXXXElementType for this module, as "Form" isn't approrpriate
			//TODO: Really, the modularization of this should be built, so sub-modules/packages can "load" their variants
			as: "namespace",
			...rest,
		}),
	};
};

export const NamespaceReducers = () => ({
	...Group.Reducers,
});

export default {
	State: NamespaceState,
	Reducers: NamespaceReducers(),
};