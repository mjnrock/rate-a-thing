import React from "react";
import { readHelper } from "../../../util/helper";

export function Input({ update, element, maps }) {
	let { value } = readHelper({ element, maps });

	return (
		<input
			type={ element.as }
			value={ value }
			readOnly={ true }
		/>
	);
}

export default Input;