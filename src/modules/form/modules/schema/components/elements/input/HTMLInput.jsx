import React from "react";
import { HTMLInputSchema } from "../../../../../models/input/HTMLInput";
import { GridForm } from "../../../../../components/GridForm";

export function HTMLInput({ update, element, columns }) {
	const { as: inputType } = element;
	const inputSchema = HTMLInputSchema[ inputType ];

	const handleElementUpdate = (key, value) => {
		update("mergeElementState", element.id, { [ key ]: value });
	};

	return (
		<GridForm
			schema={ inputSchema }
			state={ element.state }
			update={ handleElementUpdate }
			columns={ columns }
		/>
	);
}

export default HTMLInput;