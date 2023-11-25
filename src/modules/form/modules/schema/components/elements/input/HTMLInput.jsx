import React from "react";
import { HTMLInputSchema } from "../../../../../models/input/HTMLInput";
import { GridForm } from "../../../../../components/GridForm";

export function HTMLInput({ update, element, columns = 2 }) {
	const { as: inputType } = element;
	const inputSchema = HTMLInputSchema[ inputType ];

	const handleElementUpdate = (id, prop, value) => {
		console.log(id, prop, value)
		update("mergeElementState", id, { [ prop ]: value });
	};

	return (
		<GridForm
			schema={ inputSchema }
			element={ element }
			update={ handleElementUpdate }
			columns={ columns }
		/>
	);
}

export default HTMLInput;