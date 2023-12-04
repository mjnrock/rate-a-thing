//TODO: Convert over to package/module format

import { EnumElementType } from "../EnumType";
import Element from "../Element";

export const CollectionState = ({ ...rest } = {}) => {
	return {
		...Element.State({
			type: EnumElementType.OBJECT,
			...rest,
		}),
	};
};

export const CollectionReducers = () => ({
	...Element.Reducers,
});

export default {
	State: CollectionState,
	Reducers: CollectionReducers(),
};