export const EnumElementType = {
	ELEMENT: "element",	// a generic element
	GROUP: "group",
	TEXT: "text",
	NUMBER: "number",
	BOOLEAN: "boolean",
	OBJECT: "object",
	ARRAY: "array",

	INPUT: "input",
};

/* Module-specific version, for use with `as` property */
export const EnumFormElementType = {
	[ EnumElementType.ARRAY ]: {
		DROPDOWN: "dropdown",
	},
	[ EnumElementType.GROUP ]: {
		FORM: "form",
		SECTION: "section",
	},
	[ EnumElementType.TEXT ]: {
		CHARACTER: "character",
		HEADING: "heading",
		MARKDOWN: "markdown",
	},
	[ EnumElementType.NUMBER ]: {
		INT8: "int8",
		INT16: "int16",
		INT32: "int32",
		UINT8: "uint8",
		UINT16: "uint16",
		UINT32: "uint32",
		FLOAT32: "float32",
	},
	[ EnumElementType.BOOLEAN ]: {
		BITMASK: "bitmask",
	},
	[ EnumElementType.INPUT ]: {
		// HTML input types
		TEXT: "text",
		CODE: "code",
		NUMBER: "number",
		DATE: "date",
		TIME: "time",
		DATETIME: "datetime-local",
		WEEK: "week",
		MONTH: "month",
		EMAIL: "email",
		PASSWORD: "password",
		COLOR: "color",
		FILE: "file",
		IMAGE: "image",
		URL: "url",
		TELEPHONE: "tel",
		RANGE: "range",
		CHECKBOX: "checkbox",
		RADIO: "radio",

		// Custom input types
		TEXTAREA: "textarea",
		MARKDOWN: "markdown",
		SWITCH: "switch",	// Switch is a binary radio with a different UI
		RATING: "rating",	// Rating is a range with a different UI
	},
}

export default EnumElementType;