export const EnumElementType = {
	ELEMENT: "element",
	GROUP: "group",
	TEXT: "text",
	NUMBER: "number",
	BOOLEAN: "boolean",
	OBJECT: "object",
	ARRAY: "array",
};

export const EnumElementAs = {
	[ EnumElementType.TEXT ]: {
		UUID: "uuid",
		CHARACTER: "character",	// Single character
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
};

export default {
	EnumElementType,
	EnumElementAs,
};