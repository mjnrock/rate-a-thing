import React from "react";
import { CodeSchema } from "../../../../../../modules/form/models/text/Code";
import { ConfigForm } from "../../../../../../components/ConfigForm";

export function Code({ update, element, columns = 2 }) {
	const handleElementUpdate = (id, prop, value) => {
		update("mergeElementState", id, { [ prop ]: value });
	};

	return (
		<ConfigForm
			schema={ CodeSchema }
			element={ element }
			update={ handleElementUpdate }
			columns={ columns }
		/>
	);
}

export default Code;