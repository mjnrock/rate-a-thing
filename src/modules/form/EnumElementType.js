//TODO: Refactor INPUT subtypes so that it's exclusively HTML Input Types

export const EnumElementType = {
	ELEMENT: "element",	// a generic element
	GROUP: "group",
	TEXT: "text",
	NUMBER: "number",
	BOOLEAN: "boolean",
	OBJECT: "object",
	ARRAY: "array",

	INPUT: "input",
	RATING: "rating",
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
		CHARACTER: "character",	// Single character
		CODE: "code",			// Code block (CodeMirror)
		HEADING: "heading",		// Heading (h1, h2, h3, etc.)
		MARKDOWN: "markdown",	// Markdown block (remarkable)
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
	},
	[ EnumElementType.RATING ]: {
		LIKE_DISLIKE: "like-dislike",	// Thumbs up/down
		RANGE: "range",					// 1-5 stars, 1-10 scale, etc.
		COMMENT: "comment",				// Markdown comment
	},
}

export default EnumElementType;