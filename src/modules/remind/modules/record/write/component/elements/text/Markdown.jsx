import React from "react";
import ReactMarkdown from "react-markdown";

export function Markdown({ update, element }) {
	const { value } = element.state;

	return (
		<ReactMarkdown>{ value }</ReactMarkdown>
	);
}

export default Markdown;