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

export const EnumElementAs = {
	[ EnumElementType.GROUP ]: {
		NAMESPACE: "namespace",		// A folder-like grouping structure
		COLLECTION: "collection",	// A collection of data records, with a reference schema attached
	},
}

export default {
	EnumElementType,
	EnumElementAs,
};