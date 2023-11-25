import React from "react";
import { InputField } from "./InputField";

export function GridForm({ schema, state, update, columns = 2, children, ...props }) {
	const handleUpdate = (key, value) => {
		update(key, value);
	};

	const gridStyles = {
		display: "grid",
		gridTemplateColumns: `repeat(${ columns }, 1fr)`,
		gap: "1rem",
	};

	return (
		<div className="w-full" style={ gridStyles } { ...props }>
			{ Object.entries(schema).map(([ key, schemaDetails ]) => {
				const [ elementType, ...options ] = Array.isArray(schemaDetails) ? schemaDetails : [ schemaDetails ];
				const value = state[ key ] || "";

				// Pass the options starting from the third element if elementType is "array"
				const extraProps = elementType === "array" ? { options: options.slice(1) } : {};

				return (
					<InputField
						key={ key }
						label={ key.charAt(0).toUpperCase() + key.slice(1) }
						type={ elementType }
						value={ value }
						onChange={ (e) => handleUpdate(key, elementType === "array" ? e.target.value : e) }
						extraProps={ extraProps }
					/>
				);
			}) }
			{ children }
		</div>
	);
};

export default GridForm;