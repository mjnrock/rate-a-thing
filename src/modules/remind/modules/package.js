import Element from "./element/package";
import Form from "./form/package";

const { EnumElementType, EnumElementAs } = Element;
const { EnumFormType, EnumFormAs } = Form;

const merge = (a, b) => {
	const keys = new Set([ ...Object.keys(a), ...Object.keys(b) ]);

	const result = {};

	for(const key of keys) {
		if(a.hasOwnProperty(key) && b.hasOwnProperty(key)) {
			result[ key ] = merge(a[ key ], b[ key ]);
		} else if(a.hasOwnProperty(key)) {
			result[ key ] = a[ key ];
		} else {
			result[ key ] = b[ key ];
		}
	}

	return result;
};



export const Modules = merge(Element, Form);
export const EnumType = merge(EnumElementType, EnumFormType);
export const EnumAs = merge(EnumElementAs, EnumFormAs);

export default {
	Modules,
	EnumType,
	EnumAs,
};