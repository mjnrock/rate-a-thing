import React from "react";
import { MarkdownSchema } from "../../../../../models/text/Markdown";
import { ConfigForm } from "../../../../../components/ConfigForm";

export function Markdown({ update, element, columns = 2 }) {
	const handleElementUpdate = (id, prop, value) => {
		update("mergeElementState", id, { [ prop ]: value });
	};

	return (
		<ConfigForm
			schema={ MarkdownSchema }
			element={ element }
			update={ handleElementUpdate }
			columns={ columns }
		/>
	);
}

export default Markdown;