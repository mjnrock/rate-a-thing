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
			className={ `shadow flex flex-row items-center p-2 m-2 border border-solid text-neutral-400 rounded border-neutral-200 ${ isCollapsed ? "justify-start cursor-pointer bg-neutral-100 hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200 active:bg-sky-700 active:border-sky-50 active:text-sky-50" : "justify-between" }` }
			onClick={ e => { isCollapsed && handleCollapseToggle() } }
		>
			{
				isCollapsed && (
					<div
						className="flex flex-row items-center px-2 py-1 rounded cursor-pointer"
						onClick={ handleCollapseToggle }
					>
						<span className="flex items-center"><BsChevronRight /></span>
						{/* <span className="ml-2 italic">Add Element</span> */}
					</div>
				)
			}

			<div className="flex flex-row items-center justify-center">
				{
					!isCollapsed && Object.keys(EnumElementType).map((key, i) => (
						<div
							key={ key }
							className="flex flex-row p-2 m-2 border border-solid rounded shadow-md cursor-pointer select-none text-neutral-600 bg-neutral-100 border-neutral-200 hover:bg-sky-50 hover:border-sky-200 hover:text-sky-500 active:bg-sky-700 active:border-sky-50 active:text-sky-50"
							onClick={ e => {
								update("addElementByType", EnumElementType[ key ], element.id);
							} }
						>
							{ key }
						</div>
					))
				}
			</div>

			{
				!isCollapsed && (
					<div
						className="flex flex-row items-center p-4 border border-solid rounded cursor-pointer bg-neutral-100 border-neutral-200 hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200 text-neutral-400 active:bg-sky-700 active:border-sky-50 active:text-sky-50"
						onClick={ handleCollapseToggle }
					>
						<span className="flex items-center"><BsChevronDown /></span>
						{/* <span className="ml-2 italic">Collapse</span> */}
					</div>
				)
			}
		</div>
	);
};

export default TypeBar;
