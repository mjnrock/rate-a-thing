import React, { useEffect, useState } from "react";
import EnumElementType from "../../../EnumElementType";
import { BsChevronRight, BsChevronUp } from "react-icons/bs";

export const TypeBar = ({ update, element, collapsed = true, collapsible = true }) => {
	const [ isCollapsed, setIsCollapsed ] = useState(collapsed);

	const handleCollapseToggle = () => {
		collapsible && setIsCollapsed(!isCollapsed);
	};

	useEffect(() => {
		setIsCollapsed(collapsed);
	}, [ collapsed ]);

	return (
		<div
			className={ `shadow bg-neutral-50 flex flex-row items-center overflow-x-auto p-2 m-2 border border-solid text-neutral-500 rounded border-neutral-200 ${ isCollapsed ? "justify-start cursor-pointer bg-neutral-100 hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200 active:bg-sky-700 active:border-sky-50 active:text-sky-50" : "justify-between" }` }
			onClick={ e => { isCollapsed && handleCollapseToggle() } }
		>
			{ isCollapsed && (
				<div
					className="flex flex-row items-center px-2 py-1 rounded cursor-pointer"
					onClick={ handleCollapseToggle }
				>
					<span className="flex items-center"><BsChevronRight /></span>
				</div>
			) }

			<div className="grid justify-center w-full grid-flow-row gap-3 auto-rows-max grid-cols-auto-fit" style={ { gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))' } }>
				{ !isCollapsed && Object.keys(EnumElementType).map((key, i) => (
					<div
						key={ key }
						className="items-center justify-center px-2 py-4 bg-white border border-solid rounded shadow cursor-pointer select-none border-neutral-200 hover:bg-sky-50 hover:border-sky-200 hover:text-sky-500 active:bg-sky-700 active:border-sky-50 active:text-sky-50"
						onClick={ e => {
							update("addElementByType", EnumElementType[ key ], element.id);
						} }
					>
						<div className="text-center">{ key.toLowerCase() }</div>
					</div>
				)) }
			</div>

			{ (collapsible && !isCollapsed) && (
				<div
					className="flex flex-row items-center p-4 ml-3 mr-2 border border-solid rounded cursor-pointer border-neutral-200 hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200 text-neutral-400 active:bg-sky-700 active:border-sky-50 active:text-sky-50"
					onClick={ handleCollapseToggle }
				>
					<span className="flex items-center"><BsChevronUp /></span>
				</div>
			) }
		</div>
	);
};

export default TypeBar;