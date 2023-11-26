import { EnumElementType, EnumFormElementType } from "../EnumElementType";

import Element from "./Element";

import ArrayModel from "./array/Array";		// Array is a reserved word

import BooleanModel from "./boolean/Boolean";	// Boolean is a reserved word

import Group from "./group/Group";
import Form from "./group/Form";

import Input from "./input/Input";

import NumberModel from "./number/Number";	// Number is a reserved word

import ObjectModel from "./object/Object";	// Object is a reserved word

import Rating from "./rating/Rating";
import Range from "./rating/Range";

import Text from "./text/Text";
import Heading from "./text/Heading";

export const TypeModelMap = {
	[ EnumElementType.ELEMENT ]: Element,

	[ EnumElementType.ARRAY ]: ArrayModel,
	[ EnumElementType.BOOLEAN ]: BooleanModel,
	[ EnumElementType.GROUP ]: Group,
	[ EnumElementType.NUMBER ]: NumberModel,
	[ EnumElementType.OBJECT ]: ObjectModel,
	[ EnumElementType.TEXT ]: Text,

	[ EnumElementType.INPUT ]: Input,
	[ EnumElementType.RATING ]: Rating,
};

export const AsModelMap = {
	[ EnumFormElementType.ELEMENT ]: Element,

	[ EnumElementType.ARRAY ]: {},
	[ EnumElementType.BOOLEAN ]: {},
	[ EnumElementType.GROUP ]: {
		[ EnumFormElementType[ EnumElementType.GROUP ].FORM ]: Form,
	},
	[ EnumElementType.NUMBER ]: {},
	[ EnumElementType.OBJECT ]: {},
	[ EnumElementType.TEXT ]: {
		[ EnumFormElementType[ EnumElementType.TEXT ].HEADING ]: Heading,
	},

	[ EnumElementType.INPUT ]: {},
	[ EnumElementType.RATING ]: {
		[ EnumFormElementType[ EnumElementType.RATING ].RANGE ]: Range,
	},
};