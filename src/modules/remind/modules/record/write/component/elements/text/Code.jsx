import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { writeHelper } from "../../../util/helper";

export function Code({ update, element, maps }) {
	let { value, dataDispatcher } = writeHelper({ update, element, maps });

	return (
		<CodeMirror
			value={ value }
			onChange={ nextValue => dataDispatcher(nextValue) }
			options={ {
				mode: "javascript",
				theme: "material",
				lineNumbers: true,
				autoFocus: true,
			} }
		/>
	);
}

export default Code;