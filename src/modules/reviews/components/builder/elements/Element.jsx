import React, { useState } from "react";
import ElementType from "./ElementType";
import ElementSubType from "./ElementSubType";

export const Element = ({ map, element, onUpdate, ...rest }) => {
	const [ type, setType ] = useState(element.$type);

	//FIXMEL setType and related functionality should become reducers

	return (
		<div
		className="flex flex-col w-full gap-2 p-4 rounded shadow bg-neutral-100"
			// className="flex flex-col w-full gap-2 rounded"
			// className="flex flex-col w-full gap-2 p-4 bg-white border rounded shadow border-neutral-300"
			{ ...rest }
		>
			{/* <div className="flex flex-row items-center w-full p-2 bg-white border-l-2 rounded border-l-blue-300"> */}
			<div className="flex flex-row items-center w-full p-2 bg-white border rounded shadow border-neutral-100">
				<span className="justify-center mr-2 text-xs font-bold text-center text-gray-500 uppercase basis-1/12">type</span>
				<ElementType
					type={ element.$type }
					onSelect={ (type) => {
						setType(type);
					} }
				/>
			</div>

			{/* <div className="flex flex-row items-center w-full p-2 bg-white border-l-2 rounded border-l-blue-300"> */}
			<div className="flex flex-row items-center w-full p-2 bg-white border rounded shadow border-neutral-100">
				<span className="justify-center mr-2 text-xs font-bold text-center text-gray-500 uppercase basis-1/12">subtype</span>
				<ElementSubType
					type={ type }
					subtype={ element.$subtype }
					onSelect={ console.log }
				/>
			</div>


			{/* <div className="flex flex-row items-center w-full p-2 bg-white border-l-2 rounded border-l-blue-300"> */}
			<div className="flex flex-row items-center w-full p-2 bg-white border rounded shadow border-neutral-100">
				<span className="justify-center mr-2 text-xs font-bold text-center text-gray-500 uppercase basis-1/12">state</span>
				<span className="basis-11/12">
					{ map[ element.$type ][ element.$subtype ]({ element, map, onUpdate }) }
				</span>
			</div>

			{/* <div className="flex flex-row items-center w-full p-2 bg-white border-l-2 rounded border-l-blue-300"> */}
			<div className="flex flex-row items-center w-full p-2 bg-white border rounded shadow border-neutral-100">
				<span className="justify-center mr-2 text-xs font-bold text-center text-gray-500 uppercase basis-1/12">tags</span>
				{
					element.$tags.map((tag, i) => (
						<span
							key={ i }
							className="mr-2 text-xs text-gray-500 uppercase"
						>{ tag }</span>
					))
				}
			</div>
		</div>
	);
};

export default Element;