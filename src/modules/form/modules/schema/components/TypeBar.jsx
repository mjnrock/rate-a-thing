import React, { useState } from "react";
import EnumElementType from "../../../EnumElementType";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";

export const TypeBar = ({ update, element, startCollapsed = true }) => {
	const [ isCollapsed, setIsCollapsed ] = useState(startCollapsed);

	const handleCollapseToggle = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<div
			className={ `flex flex-row items-center p-2 m-2 border border-solid rounded basis-1 border-neutral-200 ` + (isCollapsed ? "cursor-pointer hover:bg-neutral-100" : "") }
			onClick={ e => { isCollapsed && handleCollapseToggle() } }
		>
			{
				!isCollapsed && Object.keys(EnumElementType).map((key, i) => (
					<div
						key={ key }
						className="flex flex-col items-center justify-center"
					>
						<div
							className="flex flex-row p-2 m-2 border border-solid rounded shadow-md cursor-pointer select-none text-neutral-600 bg-neutral-100 border-neutral-200 hover:bg-sky-100 hover:border-sky-200 hover:text-sky-500 active:bg-sky-700 active:border-sky-50 active:text-sky-50"
							onClick={ e => {
								update("addElementByType", EnumElementType[ key ], element.id);
							} }
						>
							{ key }
						</div>
					</div>
				))
			}
			<div
				className="flex flex-row items-center p-2 cursor-pointer hover:bg-neutral-100 text-neutral-400"
				onClick={ handleCollapseToggle }
			>
				<span className="flex items-center">{ isCollapsed ? <BsChevronRight /> : <BsChevronDown /> }</span>
				<span className="ml-2 italic">{ isCollapsed ? "Add Element" : "Collapse" }</span>
			</div>
		</div>
	);
};

export default TypeBar;
