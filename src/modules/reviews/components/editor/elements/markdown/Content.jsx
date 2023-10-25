import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";

export function Content({ element, onUpdate, ...rest }) {
	const content = element.value;
	const [ editedContent, setEditedContent ] = useState(content);

	const handleBlur = () => {
		onUpdate(element.$id, editedContent);
	};

	useEffect(() => {
		onUpdate(element.$id, editedContent);
	}, [ editedContent ]);

	return (
		<CodeMirror
			value={ editedContent }
			onBlur={ handleBlur }
			onChange={ (next) => setEditedContent(next) }
			options={ {
				mode: "markdown",
				theme: "material",
				lineNumbers: true,
				autoFocus: true,
			} }
			{ ...rest }
		/>
	);
};

export default Content;