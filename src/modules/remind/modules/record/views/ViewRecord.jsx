import { useEffect } from "react";
import { copyElement } from "../../../util/copyElement";
import { EnumElementType, EnumFormElementType } from "../../../EnumElementType";

import Range from "../components/view/elements/rating/Range";
import Element from "../components/view/Element";
import ElementGroup from "../components/view/ElementGroup";

export const ViewModelMap = {
	[ EnumElementType.RATING ]: (element) => {
		if(element.as === EnumFormElementType[ EnumElementType.RATING ].RANGE) {
			return Range;
		}
	},
	default: (element) => Element,
};

export function ViewRecord({ update, data }) {
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
			map={ ViewModelMap }
		/>
	);
};

export default ViewRecord;