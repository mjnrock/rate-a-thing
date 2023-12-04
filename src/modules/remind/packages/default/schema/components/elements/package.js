import Input from "./input/Input";

import Range from "./rating/Range";

import Number from "./number/Number";

import Heading from "./text/Heading";
import Markdown from "./text/Markdown";
import Code from "./text/Code";

export default {
	Rating: {
		Range,
	},
	Input: {
		Input,
	},
	Number: {
		Number,
	},
	Text: {
		Heading,
		Markdown,
		Code,
	},
};