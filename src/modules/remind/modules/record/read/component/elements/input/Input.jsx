import React from "react";
import { InputSchema } from "../../../../../../models/input/Input";
import { ConfigForm } from "../../../../../../components/ConfigForm";

export function Input({ update, element, columns = 2 }) {
	const { as } = element;
	const inputSchema = InputSchema[ as ];

	if(!inputSchema) {
		return null;
	}

	return (
		<input
			type={ element.as }
			value={ element.state.value }
			readOnly={ true }
		/>
	);
}

export default Input;