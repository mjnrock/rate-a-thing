import React from "react";
import { writeHelper } from "../../../util/helper";

export function Number({ update, element, maps }) {
	let { value, dataDispatcher } = writeHelper({ update, element, maps });

	let min = Infinity,
		max = -Infinity,
		step = null;

	if(element.as) {
		// if element.as starts with uint
		if(element.as.startsWith("uint")) {
			min = 0;
			step = 1;

			// if element.as is uint8
			if(element.as.endsWith("8")) {
				max = 255;
			} else if(element.as.endsWith("16")) {
				max = 65535;
			} else if(element.as.endsWith("32")) {
				max = 4294967295;
			}
		} else if(element.as.startsWith("int")) {
			// if element.as is int8
			if(element.as.endsWith("8")) {
				min = -128;
				max = 127;
			} else if(element.as.endsWith("16")) {
				min = -32768;
				max = 32767;
			} else if(element.as.endsWith("32")) {
				min = -2147483648;
				max = 2147483647;
			}
		} else if(element.as.startsWith("float")) {
			// if element.as is float16
			if(element.as.endsWith("16")) {
				min = -65504;
				max = 65504;
			} else if(element.as.endsWith("32")) {
				min = -3.4028234663852886e+38;
				max = 3.4028234663852886e+38;
			}
		}
	}

	return (
		<input
			type="number"
			min={ min }
			max={ max }
			step={ step }
			value={ value }
			onChange={ e => dataDispatcher(e.target.value) }
		/>
	);
}

export default Number;