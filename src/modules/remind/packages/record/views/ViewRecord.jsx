import ElementGroup from "../read/component/ElementGroup";
import Elements from "../read/component/elements/package";

import Packages from "../../../modules/package";
const { EnumType, EnumAs } = Packages;

export const TypeComponentMap = {
	[ EnumType.GROUP ]: ElementGroup,
	[ EnumType.INPUT ]: Elements.Input.Input,
	[ EnumType.NUMBER ]: Elements.Number.Number,
};

export const AsComponentMap = {
	[ EnumType.TEXT ]: {
		[ EnumAs[ EnumType.TEXT ].HEADING ]: Elements.Text.Heading,
		[ EnumAs[ EnumType.TEXT ].CODE ]: Elements.Text.Code
	},
	[ EnumType.RATING ]: {
		[ EnumAs[ EnumType.RATING ].RANGE ]: Elements.Rating.Range,
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
			maps={ { TypeComponentMap, AsComponentMap, data: recordState.data } }
		/>
	);
};

export default ViewRecord;