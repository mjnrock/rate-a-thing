import React from "react";
import { InputSchema } from "../../../../models/input/Input";
import { GridForm } from "../../../../components/GridForm";

export function Input({ update, element, columns = 2 }) {
	const { as } = element;
	const inputSchema = InputSchema[ as ];

	const handleElementUpdate = (id, prop, value) => {
		update("mergeElementState", id, { [ prop ]: value });
	};

	if(!inputSchema) {
		return null;
	}

	return (
		<GridForm
			schema={ inputSchema }
			element={ element }
			update={ handleElementUpdate }
			columns={ columns }
		/>
	);
}

export default Input;