import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import CodeMirror from "@uiw/react-codemirror";

export function Heading({ element, onUpdate, ...rest }) {
	const content = element.value;
	const [ isEditing, setIsEditing ] = useState(false);
	const [ editedContent, setEditedContent ] = useState(content);

	const handleDoubleClick = () => {
		setIsEditing(true);
	};

	const handleBlur = () => {
		setIsEditing(false);
		onUpdate(element.$id, editedContent);
	};

	const handleKeyDown = (event) => {
		if(event.keyCode === 27 || (event.ctrlKey && event.keyCode === 13)) {
			setIsEditing(false);
		}
	};

	useEffect(() => {
		onUpdate(element.$id, editedContent);
	}, [ editedContent ]);

	return isEditing ? (
		<CodeMirror
			value={ editedContent }
			onBlur={ handleBlur }
			onKeyDown={ handleKeyDown }
			onChange={ (next) => setEditedContent(next) }
			options={ {
				mode: "markdown",
				theme: "material",
				lineNumbers: true,
				autoFocus: true,
			} }
			{ ...rest }
		/>
	) : (
		<div
			onDoubleClick={ handleDoubleClick }
			{ ...rest }
		>
			<Markdown>{ content }</Markdown>
		</div>
	);
};

export default Heading;