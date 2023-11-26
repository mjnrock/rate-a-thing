import React, { useCallback } from "react";
import { debounce } from "../../../util/debounce";
import { ConfigField } from "./ConfigField";

export function ConfigForm({ schema, element, update, columns = 2, children, ...props }) {
	const debouncedUpdate = useCallback(debounce((id, prop, value) => {
		update(id, prop, value);
	}, 50), []);

	const handleUpdate = (prop, value) => {
		debouncedUpdate(element.id, prop, value);
	};

	const gridStyles = {
		display: "grid",
		gridTemplateColumns: `repeat(${ columns }, 1fr)`,
		gap: "1rem",
	};

	return (
		<div className="w-full" style={ gridStyles } { ...props }>
			{ Object.entries(schema).map(([ prop, schemaDetails ]) => {
				const [ elementType, ...options ] = Array.isArray(schemaDetails) ? schemaDetails : [ schemaDetails ];
				const value = element.state[ prop ] || "";

				// Pass the options starting from the third element if elementType is "array"
				const extraProps = elementType === "array" ? { options: options.slice(1) } : {};

				return (
					<ConfigField
						key={ prop }
						label={ prop.charAt(0).toUpperCase() + prop.slice(1) }
						type={ elementType }
						value={ value }
						onChange={ (e) => handleUpdate(prop, e.target.value) }
						extraProps={ extraProps }
					/>
				);
			}) }
			{ children }
		</div>
	);
};

export default ConfigForm;