import React, { useState } from "react";
import EnumElementType from "../../../lib/EnumElementType";

const classNames = (...classes) => {
	return classes.filter(Boolean).join(" ");
};

export function ElementType({ type, onSelect, exclude = [] }) {
	const modEnumElementType = Object.keys(EnumElementType).reduce((acc, key) => {
		if(!exclude.includes(EnumElementType[ key ])) {
			acc[ key ] = EnumElementType[ key ];
		}
		return acc;
	}, {});
	let initialType = Object.keys(modEnumElementType).find((key) => modEnumElementType[ key ] === type);
	const [ selectedType, setSelectedType ] = useState(initialType || "");

	const handleButtonClick = (key) => {
		setSelectedType(key);
		onSelect(modEnumElementType[ key ]);
	};

	return (
		<div className="flex flex-row items-center justify-start w-full p-1 bg-gray-200 border-b rounded gap-x-1">
			{ Object.keys(modEnumElementType).map((key) => (
				<button
					key={ key }
					className={ classNames(
						"px-4 py-2 rounded text-sm font-medium leading-5 focus:ring-0 focus:outline-none",
						selectedType === key
							? "bg-white text-gray-800 shadow"
							: "text-gray-600 hover:bg-gray-300 hover:text-gray-800 focus:outline-none"
					) }
					onClick={ () => handleButtonClick(key) }
				>
					{ key }
				</button>
			)) }
		</div>
	);
}

export default ElementType;