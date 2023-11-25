import { EnumElementType, EnumFormElementType } from "../../EnumElementType";
import Element from "../Element";

export const InputSchema = {
	text: {
		maxlength: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ],
		minlength: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ],
		pattern: EnumElementType.STRING,
		placeholder: EnumElementType.STRING,
		readonly: [ EnumElementType.BOOLEAN, EnumFormElementType[ EnumElementType.BOOLEAN ].BITMASK ],
		size: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ]
	},
	password: {
		maxlength: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ],
		minlength: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ],
		pattern: EnumElementType.STRING,
		placeholder: EnumElementType.STRING,
		readonly: [ EnumElementType.BOOLEAN, EnumFormElementType[ EnumElementType.BOOLEAN ].BITMASK ],
		size: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ]
	},
	number: {
		min: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].FLOAT32 ],
		max: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].FLOAT32 ],
		step: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].FLOAT32 ]
	},
	range: {
		min: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].FLOAT32 ],
		max: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].FLOAT32 ],
		step: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].FLOAT32 ]
	},
	email: {
		maxlength: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ],
		minlength: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ],
		multiple: [ EnumElementType.BOOLEAN, EnumFormElementType[ EnumElementType.BOOLEAN ].BITMASK ],
		pattern: EnumElementType.STRING,
		placeholder: EnumElementType.STRING,
		size: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ]
	},
	url: {
		maxlength: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ],
		minlength: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ],
		pattern: EnumElementType.STRING,
		placeholder: EnumElementType.STRING,
		size: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ]
	},
	tel: {
		maxlength: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ],
		minlength: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ],
		pattern: EnumElementType.STRING,
		placeholder: EnumElementType.STRING,
		size: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ]
	},
	date: {
		min: EnumElementType.STRING,
		max: EnumElementType.STRING
	},
	time: {
		min: EnumElementType.STRING,
		max: EnumElementType.STRING,
		step: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].FLOAT32 ]
	},
	"datetime-local": {
		min: EnumElementType.STRING,
		max: EnumElementType.STRING,
		step: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].FLOAT32 ]
	},
	week: {
		min: EnumElementType.STRING,
		max: EnumElementType.STRING
	},
	month: {
		min: EnumElementType.STRING,
		max: EnumElementType.STRING
	},
	color: {
		// No specific attributes required for "color"
	},
	code: {
		// No specific attributes required for "code"
	},
	checkbox: {
		checked: [ EnumElementType.BOOLEAN, EnumFormElementType[ EnumElementType.BOOLEAN ].BITMASK ],
		value: EnumElementType.STRING
	},
	radio: {
		checked: [ EnumElementType.BOOLEAN, EnumFormElementType[ EnumElementType.BOOLEAN ].BITMASK ],
		name: EnumElementType.STRING,
		value: EnumElementType.STRING
	},
	file: {
		accept: EnumElementType.STRING,
		multiple: [ EnumElementType.BOOLEAN, EnumFormElementType[ EnumElementType.BOOLEAN ].BITMASK ],
		required: [ EnumElementType.BOOLEAN, EnumFormElementType[ EnumElementType.BOOLEAN ].BITMASK ]
	},
	submit: {
		formaction: EnumElementType.STRING,
		formenctype: EnumElementType.STRING,
		formmethod: EnumElementType.STRING,
		formnovalidate: [ EnumElementType.BOOLEAN, EnumFormElementType[ EnumElementType.BOOLEAN ].BITMASK ],
		formtarget: EnumElementType.STRING
	},
	image: {
		alt: EnumElementType.STRING,
		formaction: EnumElementType.STRING,
		formenctype: EnumElementType.STRING,
		formmethod: EnumElementType.STRING,
		formnovalidate: [ EnumElementType.BOOLEAN, EnumFormElementType[ EnumElementType.BOOLEAN ].BITMASK ],
		formtarget: EnumElementType.STRING,
		height: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ],
		src: EnumElementType.STRING,
		width: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ]
	},
	reset: {
		// No specific attributes required for "reset"
	},
	button: {
		// No specific attributes required for "button"
	},
	search: {
		maxlength: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ],
		minlength: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ],
		pattern: EnumElementType.STRING,
		placeholder: EnumElementType.STRING,
		readonly: [ EnumElementType.BOOLEAN, EnumFormElementType[ EnumElementType.BOOLEAN ].BITMASK ],
		size: [ EnumElementType.NUMBER, EnumFormElementType[ EnumElementType.NUMBER ].UINT32 ]
	},
	hidden: {
		value: EnumElementType.STRING
	},
};

export const InputState = ({ as = EnumFormElementType[ EnumElementType.INPUT ].TEXT, ...rest } = {}) => {
	return {
		...Element.State({
			type: EnumElementType.INPUT,
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