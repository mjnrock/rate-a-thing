import React from "react";
import { InputField } from "./InputField";

export function GridForm({ schema, element, update, columns = 2, children, ...props }) {
	const handleUpdate = (prop, value) => {
		console.log(prop, value)
		update(element.id, prop, value);
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
					<InputField
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

export default GridForm;