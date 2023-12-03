import { EnumElementType } from "../../../element/EnumElementType";
import { EnumFormAs } from "../../EnumFormType";

import Form from "./Form";

export const SectionState = ({ ...rest } = {}) => {
	return {
		...Form.State({
			as: EnumFormAs[ EnumElementType.GROUP ].SECTION,
		}),
		...rest,
	};
};

export const SectionReducers = () => ({
	...Form.Reducers,
});

export default {
	State: SectionState,
	Reducers: SectionReducers(),
};