import { Switch } from "@headlessui/react";

export function getFieldTypeJSX(type, value, onChange, extraProps = {}) {
	switch(type) {
		case "number":
			return (
				<input
					type="number"
					value={ value }
					onChange={ onChange }
					className="flex-1 w-full p-2 font-mono border border-solid rounded shadow-md select-none text-neutral-600 border-neutral-200"
					{ ...extraProps }
				/>
			);
		case "boolean":
			return (
				<Switch
					checked={ value }
					onChange={ v => onChange({ target: { value: v } }) /* make it conform to the minimalp event interface */ }
					className={ `${ value ? "bg-sky-500" : "bg-gray-200" }
                                relative inline-flex items-center h-6 rounded-full w-11`}
				>
					<span className="sr-only">Enable (setting)</span>
					<span
						className={ `${ value ? "translate-x-6" : "translate-x-1" }
                                    inline-block w-4 h-4 transform bg-white rounded-full transition`}
					/>
				</Switch>
			);
		case "array":
			return (
				<select
					value={ value }
					onChange={ onChange }
					className="flex-1 w-full p-2 font-mono border border-solid rounded shadow-md select-none text-neutral-600 border-neutral-200"
					{ ...extraProps }
				>
					{ extraProps.options.map((option, index) => (
						<option key={ index } value={ option }>
							{ option.charAt(0).toUpperCase() + option.slice(1) }
						</option>
					)) }
				</select>
			);
		case "string":
		default:
			return (
				<input
					type="text"
					value={ value }
					onChange={ onChange }
					className="flex-1 w-full p-2 font-mono border border-solid rounded shadow-md select-none text-neutral-600 border-neutral-200"
					{ ...extraProps }
				/>
			);
	}
};

export function ConfigField({ label, type, value, onChange, extraProps }) {
	const inputElement = getFieldTypeJSX(type, value, onChange, extraProps);
	return (
		<div className="flex flex-col w-full gap-1 p-2">
			<label className="block text-sm font-medium text-gray-700">{ label }</label>
			{ inputElement }
		</div>
	);
};

export default {
	getFieldTypeJSX,
	ConfigField,
};