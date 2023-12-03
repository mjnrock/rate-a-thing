import React, { useCallback } from "react";
import { debounce } from "../../../util/debounce";
import { ConfigField } from "./ConfigField";

import Packages from "../packages/package";
const { EnumType } = Packages;

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

				if(element.type === EnumType.INPUT) {
					if(prop === "value") {
						return (
							<div
								key={ prop }
								className="flex flex-col w-full gap-1 p-2"
							>
								<label className="block text-sm font-medium text-gray-700">{ prop.charAt(0).toUpperCase() + prop.slice(1) }</label>
								<input
									type={ element.as }
									onChange={ (e) => handleUpdate(prop, e.target.value) }
									className="flex-1 w-full p-2 font-mono border border-solid rounded shadow-md select-none text-neutral-600 border-neutral-200"
									{ ...element.state }
								/>
							</div>
						);
					}
				}

				return (
					<ConfigField
						key={ prop }
						element={ element }
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