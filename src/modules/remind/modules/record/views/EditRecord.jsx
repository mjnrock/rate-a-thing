import { EnumElementType, EnumFormElementType } from "../../../EnumElementType";

import ElementGroup from "../write/component/ElementGroup";
import Elements from "../write/component/elements/package";

export const TypeModelMap = {
	[ EnumElementType.GROUP ]: ElementGroup,
	[ EnumElementType.INPUT ]: Elements.Input.Input,
	[ EnumElementType.NUMBER ]: Elements.Number.Number,
};

export const AsModelMap = {
	[ EnumElementType.TEXT ]: {
		[ EnumFormElementType[ EnumElementType.TEXT ].HEADING ]: Elements.Text.Heading,
		[ EnumFormElementType[ EnumElementType.TEXT ].CODE ]: Elements.Text.Code
	},
	[ EnumElementType.RATING ]: {
		[ EnumFormElementType[ EnumElementType.RATING ].RANGE ]: Elements.Rating.Range,
	},
};

export function EditRecord({ update, data }) {
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

export default EditRecord;