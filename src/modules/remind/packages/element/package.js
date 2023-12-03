import { EnumElementType, EnumElementAs } from "./EnumElementType";
export { EnumElementType, EnumElementAs };

import Element from "./models/Element";

import ArrayModel from "./models/array/Array";		// Array is a reserved word

import BooleanModel from "./models/boolean/Boolean";	// Boolean is a reserved word

import Group from "./models/group/Group";
import Form from "./group/Form";

import NumberModel from "./models/number/Number";	// Number is a reserved word

import ObjectModel from "./models/object/Object";	// Object is a reserved word

import Text from "./models/text/Text";
import UUID from "./models/text/UUID";
import Character from "./models/text/Character";

export const TypeModelMap = {
	[ EnumElementType.ELEMENT ]: Element,

	[ EnumElementType.ARRAY ]: ArrayModel,
	[ EnumElementType.BOOLEAN ]: BooleanModel,
	[ EnumElementType.GROUP ]: Group,
	[ EnumElementType.NUMBER ]: NumberModel,
	[ EnumElementType.OBJECT ]: ObjectModel,
	[ EnumElementType.TEXT ]: Text,
};

export const AsModelMap = {
	[ EnumElementAs.ELEMENT ]: Element,

	[ EnumElementType.ARRAY ]: {},
	[ EnumElementType.BOOLEAN ]: {},
	[ EnumElementType.GROUP ]: {},
	[ EnumElementType.NUMBER ]: {},
	[ EnumElementType.OBJECT ]: {},
	[ EnumElementType.TEXT ]: {
		[ EnumElementAs[ EnumElementType.TEXT ].UUID ]: UUID,
		[ EnumElementAs[ EnumElementType.TEXT ].CHARACTER ]: Character,
	},
};

export const Models = {
	Element: {
		Element,
	},
	Array: {
		Array: ArrayModel,
	},
	Boolean: {
		Boolean: BooleanModel,
	},
	Group: {
		Group,
		Form,
	},
	Number: {
		Number: NumberModel,
	},
	Object: {
		Object: ObjectModel,
	},
	Text: {
		Text,
		UUID,
		Character,
	},
};

export default {
	Models,
	TypeModelMap,
	AsModelMap,
	EnumElementType,
	EnumElementAs,
};