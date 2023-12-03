import { EnumElementType } from "../EnumElementType";
import Element from "../Element";

export const RecordSetState = ({ ...rest } = {}) => {
	return {
		...Element.State({
			type: EnumElementType.OBJECT,
			...rest,
		}),
	};
};

export const RecordSetReducers = () => ({
	...Element.Reducers,
});

export default {
	State: RecordSetState,
	Reducers: RecordSetReducers(),
};