import { useEffect } from "react";
import { copyElement } from "../../../util/copyElement";
import { EnumElementType, EnumFormElementType } from "../../../EnumElementType";

import Range from "../../components/edit/elements/rating/Range";
import ElementGroup from "../../components/edit/ElementGroup";

export const TypeModelMap = {};

export const AsModelMap = {
	[ EnumElementType.RATING ]: {
		[ EnumFormElementType[ EnumElementType.RATING ].RANGE ]: Range,
	},
};

export function EditRecord({ update, data }) {
	const { schemaState, recordState } = data;

	useEffect(() => {
		//TODO: Implement a way to only do this minimally if there have been changes to the schema
		update("setActive", copyElement(schemaState.components.elements[ schemaState.form ]));
	}, []);

	const { active } = recordState;

	if(Object.keys(active).length === 0) {
		return null;
	}

	return (
		<ElementGroup
			update={ update }
			element={ active }
			config={ recordState.config }
			map={ { TypeModelMap, AsModelMap } }
		/>
	);
};

export default EditRecord;