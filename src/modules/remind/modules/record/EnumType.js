import { EnumElementType } from "../element/EnumType";

export const EnumRecordType = {};

export const EnumRecordAs = {
	[ EnumElementType.GROUP ]: {
		NAMESPACE: "namespace",		// A folder-like grouping structure
		COLLECTION: "collection",	// A collection of data records, with a reference schema attached
	},
}

export default {
	EnumRecordType,
	EnumRecordAs,
};