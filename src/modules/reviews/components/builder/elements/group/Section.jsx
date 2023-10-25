import React, { useState } from "react";

import { Element } from "../Element";
import ElementType from "../ElementType";
import ElementSubType from "../ElementSubType";

export function Section({ map, element, onUpdate, dispatch, ...rest }) {
	const children = element.value;

	//TODO: When you click a Type and SubType, invoke a dispatch to add that type of Element
	const [ type, setType ] = useState("group");

	return (
		<div
			// className="flex flex-col w-full p-4 bg-white border-l-2 rounded gap-y-10 border-l-indigo-300"
			className="flex flex-col w-full p-4 border rounded shadow-md bg-neutral-50 gap-y-10 border-neutral-100"
			{ ...rest }
		>
			{ children.map((child, i) => {
				return (
					<Element
						key={ i }
						element={ child }
						map={ map }
						onUpdate={ onUpdate }
					/>
				);
			}) }

			<div className="flex flex-col items-center justify-end w-full gap-2">
				<div
					className="flex flex-row items-center justify-center w-full p-2 text-xs font-bold text-center text-gray-500 uppercase bg-white border-b rounded select-none border-b-neutral-200"
				>
					Add Element
				</div>
				<ElementType
					type={ type }
					onSelect={ t => setType(t) }
				/>
				<ElementSubType
					type={ type }
					subtype={ null }
					onSelect={ t => console.log(t) }
				/>
			</div>
		</div>
	);
};

export default Section;