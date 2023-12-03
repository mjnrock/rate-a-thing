import LibElement from "../element/package";

import { EnumFormType, EnumFormAs } from "./EnumFormType";

import { Input } from "./models/input/Input";

import { Rating } from "./models/rating/Rating";
import { Range } from "./models/rating/Range";

import { Form } from "./models/group/Form";
import { Section } from "./models/group/Section";

import { Dropdown } from "./models/array/Dropdown";

import { Heading } from "./models/text/Heading";
import { Code } from "./models/text/Code";
import { Markdown } from "./models/text/Markdown";

export const TypeModelMap = {
	[ EnumFormType.INPUT ]: Input,
	[ EnumFormType.RATING ]: Rating,
};

export const AsModelMap = {
	[ LibElement.EnumElementType.ARRAY ]: {
		[ EnumFormAs[ LibElement.EnumElementType.ARRAY ].DROPDOWN ]: Dropdown,
	},
	[ LibElement.EnumElementType.GROUP ]: {
		[ EnumFormAs[ LibElement.EnumElementType.GROUP ].FORM ]: Form,
		[ EnumFormAs[ LibElement.EnumElementType.GROUP ].SECTION ]: Section,
	},
	[ EnumFormType.INPUT ]: {},
	[ EnumFormType.RATING ]: {
		[ EnumFormAs[ EnumFormType.RATING ].RANGE ]: Range,
	},
	[ LibElement.EnumElementType.TEXT ]: {
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
};