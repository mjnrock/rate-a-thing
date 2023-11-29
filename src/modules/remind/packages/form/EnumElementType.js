import { EnumElementType } from "../element/EnumElementType";

export { EnumElementType } from "../element/EnumElementType";

export const EnumElementAs = {
	[ EnumElementType.ARRAY ]: {
		DROPDOWN: "dropdown",
	},
	[ EnumElementType.GROUP ]: {
		FORM: "form",
		SECTION: "section",
	},
	[ EnumElementType.TEXT ]: {
		CODE: "code",			// Code block (CodeMirror)
		HEADING: "heading",		// Heading (h1, h2, h3, etc.)
		MARKDOWN: "markdown",	// Markdown block (remarkable)
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
};

export default {
	EnumElementType,
	EnumElementAs,
};