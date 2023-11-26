import React from "react";
import CodeMirror from "@uiw/react-codemirror";

export function Code({ update, element }) {
	const { recordDispatch } = update;

	const { value } = element.state;

	console.log(value);

	return (
		<CodeMirror
			value={ value }
			onChange={ (v) => {
				console.log(v, update)
				recordDispatch("setElementValue", element.id, v);
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