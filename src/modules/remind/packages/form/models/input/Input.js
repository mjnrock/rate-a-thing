import { EnumElementType, EnumElementAs } from "../../../element/EnumElementType";
import { EnumFormType } from "../../EnumFormType";

import Element from "../../../element/models/Element";

export const InputSchema = {
	text: {
		value: EnumElementType.STRING,
		maxlength: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].UINT32 ],
		minlength: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].UINT32 ],
		pattern: EnumElementType.STRING,
		placeholder: EnumElementType.STRING,
		readonly: [ EnumElementType.BOOLEAN, EnumElementAs[ EnumElementType.BOOLEAN ].BITMASK ],
		size: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].UINT32 ]
	},
	password: {
		value: EnumElementType.STRING,
		maxlength: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].UINT32 ],
		minlength: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].UINT32 ],
		pattern: EnumElementType.STRING,
		placeholder: EnumElementType.STRING,
		readonly: [ EnumElementType.BOOLEAN, EnumElementAs[ EnumElementType.BOOLEAN ].BITMASK ],
		size: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].UINT32 ]
	},
	number: {
		value: EnumElementType.STRING,
		min: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].FLOAT32 ],
		max: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].FLOAT32 ],
		step: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].FLOAT32 ]
	},
	range: {
		value: EnumElementType.STRING,
		min: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].FLOAT32 ],
		max: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].FLOAT32 ],
		step: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].FLOAT32 ]
	},
	email: {
		value: EnumElementType.STRING,
		maxlength: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].UINT32 ],
		minlength: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].UINT32 ],
		multiple: [ EnumElementType.BOOLEAN, EnumElementAs[ EnumElementType.BOOLEAN ].BITMASK ],
		pattern: EnumElementType.STRING,
		placeholder: EnumElementType.STRING,
		size: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].UINT32 ]
	},
	url: {
		value: EnumElementType.STRING,
		maxlength: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].UINT32 ],
		minlength: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].UINT32 ],
		pattern: EnumElementType.STRING,
		placeholder: EnumElementType.STRING,
		size: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].UINT32 ]
	},
	tel: {
		value: EnumElementType.STRING,
		maxlength: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].UINT32 ],
		minlength: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].UINT32 ],
		pattern: EnumElementType.STRING,
		placeholder: EnumElementType.STRING,
		size: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].UINT32 ]
	},
	date: {
		value: EnumElementType.STRING,
		min: EnumElementType.STRING,
		max: EnumElementType.STRING
	},
	time: {
		value: EnumElementType.STRING,
		min: EnumElementType.STRING,
		max: EnumElementType.STRING,
		step: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].FLOAT32 ]
	},
	"datetime-local": {
		value: EnumElementType.STRING,
		min: EnumElementType.STRING,
		max: EnumElementType.STRING,
		step: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].FLOAT32 ]
	},
	week: {
		value: EnumElementType.STRING,
		min: EnumElementType.STRING,
		max: EnumElementType.STRING
	},
	month: {
		value: EnumElementType.STRING,
		min: EnumElementType.STRING,
		max: EnumElementType.STRING
	},
	color: {
		value: EnumElementType.STRING,
		// No specific attributes required for "color"
	},
	code: {
		value: EnumElementType.STRING,
		// No specific attributes required for "code"
	},
	checkbox: {
		value: EnumElementType.STRING,
		checked: [ EnumElementType.BOOLEAN, EnumElementAs[ EnumElementType.BOOLEAN ].BITMASK ],
	},
	radio: {
		value: EnumElementType.STRING,
		checked: [ EnumElementType.BOOLEAN, EnumElementAs[ EnumElementType.BOOLEAN ].BITMASK ],
		name: EnumElementType.STRING,
	},
	file: {
		value: EnumElementType.STRING,
		accept: EnumElementType.STRING,
		multiple: [ EnumElementType.BOOLEAN, EnumElementAs[ EnumElementType.BOOLEAN ].BITMASK ],
		required: [ EnumElementType.BOOLEAN, EnumElementAs[ EnumElementType.BOOLEAN ].BITMASK ]
	},
	submit: {
		value: EnumElementType.STRING,
		formaction: EnumElementType.STRING,
		formenctype: EnumElementType.STRING,
		formmethod: EnumElementType.STRING,
		formnovalidate: [ EnumElementType.BOOLEAN, EnumElementAs[ EnumElementType.BOOLEAN ].BITMASK ],
		formtarget: EnumElementType.STRING
	},
	image: {
		value: EnumElementType.STRING,
		alt: EnumElementType.STRING,
		formaction: EnumElementType.STRING,
		formenctype: EnumElementType.STRING,
		formmethod: EnumElementType.STRING,
		formnovalidate: [ EnumElementType.BOOLEAN, EnumElementAs[ EnumElementType.BOOLEAN ].BITMASK ],
		formtarget: EnumElementType.STRING,
		height: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].UINT32 ],
		src: EnumElementType.STRING,
		width: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].UINT32 ]
	},
	reset: {
		value: EnumElementType.STRING,
		// No specific attributes required for "reset"
	},
	button: {
		value: EnumElementType.STRING,
		// No specific attributes required for "button"
	},
	search: {
		value: EnumElementType.STRING,
		maxlength: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].UINT32 ],
		minlength: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].UINT32 ],
		pattern: EnumElementType.STRING,
		placeholder: EnumElementType.STRING,
		readonly: [ EnumElementType.BOOLEAN, EnumElementAs[ EnumElementType.BOOLEAN ].BITMASK ],
		size: [ EnumElementType.NUMBER, EnumElementAs[ EnumElementType.NUMBER ].UINT32 ]
	},
	hidden: {
		value: EnumElementType.STRING,
	},
};

export const InputState = ({ as, ...rest } = {}) => {
	return {
		...Element.State({
			type: EnumFormType.INPUT,
			as,
			state: {
				value: "",
			},
			...rest
		}),
	};
};

export const InputReducers = () => ({
	...Element.Reducers,
});

export default {
	Schema: InputSchema,
	State: InputState,
	Reducers: InputReducers(),
};