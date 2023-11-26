import { useEffect } from "react";
import { copyElement } from "../../../util/copyElement";
import { EnumElementType, EnumFormElementType } from "../../../EnumElementType";

import ElementGroup from "../write/component/ElementGroup";
import Range from "../write/component/elements/rating/Range";

export const TypeModelMap = {
	[ EnumElementType.GROUP ]: ElementGroup,
};

export const AsModelMap = {
	[ EnumElementType.RATING ]: {
		[ EnumFormElementType[ EnumElementType.RATING ].RANGE ]: Range,
	},
};

export function EditRecord({ update, data }) {
	const { recordDispatch } = update;
	const { schemaState, recordState } = data;

	return (
		<ElementGroup
			update={ update }
			element={ recordState.active }
			config={ recordState.config }
			map={ { TypeModelMap, AsModelMap } }
		/>
	);
};

export default EditRecord;