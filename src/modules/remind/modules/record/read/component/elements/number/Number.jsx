import React from "react";

export function Number({ update, element, maps }) {
	const { data: dataMap } = maps;
	let { value, size } = element.state;

	if(dataMap[ element.id ]) {
		value = dataMap[ element.id ];
	}

	return (
		<div className="flex flex-row items-center justify-center w-full h-full gap-2">
			{ value.toString() }
		</div>
	);
}

export default Number;