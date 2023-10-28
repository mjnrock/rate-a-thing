import React, { useState } from "react";
import EnumElementType from "../../../lib/EnumElementType";
import EnumElementSubType from "../../../lib/EnumElementSubType";

const classNames = (...classes) => {
	return classes.filter(Boolean).join(" ");
};

export function ElementSubType({ type, subtype, onSelect }) {
	let initialType = Object.keys(EnumElementType).find((key) => EnumElementType[ key ] === type);
	let initialSubType = Object.keys(EnumElementSubType[ initialType ]).find((key) => EnumElementSubType[ initialType ][ key ] === subtype);
	let subTypes = EnumElementSubType[ initialType ];
	const [ selectedSubType, setSelectedSubType ] = useState(initialSubType || "");

	const handleButtonClick = (key) => {
		setSelectedSubType(key);
		onSelect(subTypes[ key ]);
	};

	return (
		<div className="flex flex-row items-center justify-start w-full p-1 bg-gray-300 border-b rounded gap-x-1">
			{ Object.keys(subTypes).map((key) => (
				<button
					key={ key }
					className={ classNames(
						"px-4 py-2 rounded text-sm font-medium leading-5 focus:ring-0 focus:outline-none",
						selectedSubType === key
							? "bg-white text-gray-600 shadow-md"
							: "text-gray-500 hover:bg-gray-300 hover:text-gray-700 focus:outline-none"
					) }
					onClick={ () => handleButtonClick(key) }
				>
					{ key }
				</button>
			)) }
		</div>
	);
};

export default ElementSubType;