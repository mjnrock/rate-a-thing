import React from "react";
import CodeMirror from "@uiw/react-codemirror";

export function Code({ update, element, maps }) {
	const { data: dataMap } = maps;
	let { value } = element.state;

	if(dataMap[ element.id ]) {
		value = dataMap[ element.id ];
	}

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