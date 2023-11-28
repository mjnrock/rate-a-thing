import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { readHelper } from "../../../util/helper";

export function Code({ update, element, maps }) {
	let { value } = readHelper({ element, maps });

	return (
		<CodeMirror
			value={ value }
			onChange={ (v) => {
				console.log(v, update)
			} }
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