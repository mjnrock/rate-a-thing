import React from "react";
import { InputSchema } from "../../../../../modules/form/models/input/Input";
import { ConfigForm } from "../../../../../components/ConfigForm";

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
		<ConfigForm
			schema={ inputSchema }
			element={ element }
			update={ handleElementUpdate }
			columns={ columns }
		/>
	);
}

export default Input;