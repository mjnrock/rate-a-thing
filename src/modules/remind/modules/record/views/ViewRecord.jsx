import { useEffect } from "react";
import { copyElement } from "../../../util/copyElement";
import { EnumElementType, EnumFormElementType } from "../../../EnumElementType";

import ElementGroup from "../../components/view/ElementGroup";
import Range from "../../components/view/elements/rating/Range";
import Heading from "../../components/view/elements/text/Heading";
import Code from "../../components/view/elements/text/Code";

export const TypeModelMap = {};

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

	useEffect(() => {
		//TODO: Implement a way to only do this minimally if there have been changes to the schema
		recordDispatch("setActive", copyElement(schemaState.components.elements[ schemaState.form ]));
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

export default ViewRecord;