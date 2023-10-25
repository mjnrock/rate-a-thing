import React, { useState } from "react";
import EnumElementType from "../../../lib/EnumElementType";

const classNames = (...classes) => {
	return classes.filter(Boolean).join(" ");
};

export function ElementType({ type, onSelect }) {
	let initialType = Object.keys(EnumElementType).find((key) => EnumElementType[ key ] === type);
	const [ selectedType, setSelectedType ] = useState(initialType || "");

	const handleButtonClick = (key) => {
		setSelectedType(key);
		onSelect(EnumElementType[ key ]);
	};

	return (
		<div className="flex flex-row items-center justify-start p-2 bg-gray-200 border-b gap-x-1 rounded-xl">
			{ Object.keys(EnumElementType).map((key) => (
				<button
					key={ key }
					className={ classNames(
						"px-4 py-2 rounded-md text-sm font-medium leading-5 focus:ring-0 focus:outline-none",
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