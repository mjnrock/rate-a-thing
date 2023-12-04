import LibElement from "../element/package";

import { EnumFormType, EnumFormAs } from "./EnumType";

import Input from "./models/input/Input";

import Rating from "./models/rating/Rating";
import Range from "./models/rating/Range";

import Form from "./models/group/Form";
import Section from "./models/group/Section";

import Dropdown from "./models/array/Dropdown";

import Heading from "./models/text/Heading";
import Code from "./models/text/Code";
import Markdown from "./models/text/Markdown";

const { EnumElementType, EnumElementAs } = LibElement;

export const TypeModelMap = {
	[ EnumFormType.INPUT ]: Input,
	[ EnumFormType.RATING ]: Rating,
};

export const AsModelMap = {
	[ EnumElementType.ARRAY ]: {
		[ EnumFormAs[ EnumElementType.ARRAY ].DROPDOWN ]: Dropdown,
	},
	[ EnumElementType.GROUP ]: {
		[ EnumFormAs[ EnumElementType.GROUP ].FORM ]: Form,
		[ EnumFormAs[ EnumElementType.GROUP ].SECTION ]: Section,
	},
	[ EnumFormType.INPUT ]: {},
	[ EnumFormType.RATING ]: {
		[ EnumFormAs[ EnumFormType.RATING ].RANGE ]: Range,
	},
	[ EnumElementType.TEXT ]: {
		[ EnumFormAs[ EnumElementType.TEXT ].HEADING ]: Heading,
		[ EnumFormAs[ EnumElementType.TEXT ].CODE ]: Code,
		[ EnumFormAs[ EnumElementType.TEXT ].MARKDOWN ]: Markdown,
	},
};

export const Models = {
	Array: {
		Dropdown,
	},
	Group: {
		Form,
		Section,
	},
	Input: {
		Input,
	},
	Rating: {
		Rating,
		Range,
	},
	Text: {
		Heading,
		Code,
		Markdown,
	},
};

export default {
	Models,
	TypeModelMap,
	AsModelMap,
	EnumFormType,
	EnumFormAs,
};