import React, { useState } from "react";
import EnumElementType from "../../../EnumElementType";
import { BsChevronRight, BsChevronUp } from "react-icons/bs";

export const TypeBar = ({ update, element, startCollapsed = true }) => {
	const [ isCollapsed, setIsCollapsed ] = useState(startCollapsed);

	const handleCollapseToggle = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<div
			className={ `shadow bg-neutral-50 flex flex-row items-center overflow-x-auto p-2 m-2 border border-solid text-neutral-500 rounded border-neutral-200 ${ isCollapsed ? "justify-start cursor-pointer bg-neutral-100 hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200 active:bg-sky-700 active:border-sky-50 active:text-sky-50" : "justify-between" }` }
			onClick={ e => { isCollapsed && handleCollapseToggle() } }
		>
			{
				isCollapsed && (
					<div
						className="flex flex-row items-center px-2 py-1 rounded cursor-pointer"
						onClick={ handleCollapseToggle }
					>
						<span className="flex items-center"><BsChevronRight /></span>
					</div>
				)
			}

			<div className="flex flex-row items-center justify-center w-full">
				{
					!isCollapsed && Object.keys(EnumElementType).map((key, i) => (
						<div
							key={ key }
							className="flex items-center justify-center flex-1 p-2 m-2 bg-white border border-solid rounded shadow cursor-pointer select-none border-neutral-200 hover:bg-sky-50 hover:border-sky-200 hover:text-sky-500 active:bg-sky-700 active:border-sky-50 active:text-sky-50"
							onClick={ e => {
								update("addElementByType", EnumElementType[ key ], element.id);
							} }
						>
							<div className="w-full text-center"> {/* Wrap the text and apply text-center */ }
								{ key.toLowerCase() }
							</div>
						</div>
					))
				}
			</div>

			{
				!isCollapsed && (
					<div
						className="flex flex-row items-center p-4 ml-3 mr-2 border border-solid rounded cursor-pointer border-neutral-200 hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200 text-neutral-400 active:bg-sky-700 active:border-sky-50 active:text-sky-50"
						onClick={ handleCollapseToggle }
					>
						<span className="flex items-center"><BsChevronUp /></span>
					</div>
				)
			}
		</div>
	);
};

export default TypeBar;