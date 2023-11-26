import React from "react";
import { HeadingSchema } from "../../../../../models/text/Heading";
import { ConfigForm } from "../../../../../components/ConfigForm";

export function Heading({ update, element, columns = 2 }) {
	const handleElementUpdate = (id, prop, value) => {
		update("mergeElementState", id, { [ prop ]: value });
	};

	return (
		<ConfigForm
			schema={ HeadingSchema }
			element={ element }
			update={ handleElementUpdate }
			columns={ columns }
		/>
	);
}

export default Heading;