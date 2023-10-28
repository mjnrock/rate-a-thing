export const EnumElementSubType = {
	Markdown: {
		Heading: "heading",
		Content: "content",
	},
	Range: {
		Discrete: "discrete",
		Continuous: "continuous",
		Binary: "binary",
	},
	Media: {
		Image: "image",
		Video: "video",
		Audio: "audio",
		File: "file",
		Link: "link",
		Geo: "geo",
	},
	DateTime: {
		Date: "date",
		Time: "time",
		DateTime: "datetime",
	},
	Group: {
		Generic: "generic",
		Review: "review",
		Section: "section",
		List: "list",
		Map: "map",
	},
};

export default {
	...EnumElementSubType,
};