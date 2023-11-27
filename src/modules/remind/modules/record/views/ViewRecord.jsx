import deepClone from "../../../../../util/deepClone";
import { EnumElementType, EnumFormElementType } from "../../../EnumElementType";

import ElementGroup from "../read/component/ElementGroup";
import Range from "../read/component/elements/rating/Range";
import Heading from "../read/component/elements/text/Heading";
import Code from "../read/component/elements/text/Code";

export const TypeModelMap = {
	[ EnumElementType.GROUP ]: ElementGroup,
};

export const AsModelMap = {
	[ EnumElementType.TEXT ]: {
		[ EnumFormElementType[ EnumElementType.TEXT ].HEADING ]: Heading,
		[ EnumFormElementType[ EnumElementType.TEXT ].CODE ]: Code,
	},
	[ EnumElementType.RATING ]: {
		[ EnumFormElementType[ EnumElementType.RATING ].RANGE ]: Range,
	},
};

export function ViewRecord({ update, data }) {
	const { recordDispatch } = update;
	const { schemaState, recordState } = data;

	// schemaState.components.elements[ schemaState.form ] = "the schema element"
	// recordState.data = "the UUID:value map of `value` overwrites"

	return (
		<ElementGroup
			update={ update }
			element={ schemaState.components.elements[ schemaState.form ] }
			config={ recordState.config }
			maps={ { TypeModelMap, AsModelMap, data: recordState.data } }
		/>
	);
};

export default ViewRecord;