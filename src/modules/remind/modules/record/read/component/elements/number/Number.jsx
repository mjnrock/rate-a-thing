import React from "react";
import { readHelper } from "../../../util/helper";

export function Number({ update, element, maps }) {
	let { value, size } = readHelper({ element, maps });

	return (
		<div className="flex flex-row items-center justify-center w-full h-full gap-2">
			{ value && (value).toString() }
		</div>
	);
}

export default Number;