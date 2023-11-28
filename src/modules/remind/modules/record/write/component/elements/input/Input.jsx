import React from "react";
import { writeHelper } from "../../../util/helper";

export function Input({ update, element, maps, columns = 2 }) {
	let { value, dataDispatcher } = writeHelper({ update, element, maps });

	return (
		<input
			type={ element.as }
			defaultValue={ value }
			onBlur={ e => dataDispatcher(e.target.value) }
		/>
	);
}

export default Input;