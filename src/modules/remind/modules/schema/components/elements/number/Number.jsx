import React from "react";
import { NumberSchema } from "../../../../../models/number/Number";
import { ConfigForm } from "../../../../../components/ConfigForm";

export function Number({ update, element, columns = 2 }) {
	const handleElementUpdate = (id, prop, value) => {
		update("mergeElementState", id, { [ prop ]: value });
	};

	return (
		<ConfigForm
			schema={ NumberSchema }
			element={ element }
			update={ handleElementUpdate }
			columns={ columns }
		/>
	);
}

export default Number;