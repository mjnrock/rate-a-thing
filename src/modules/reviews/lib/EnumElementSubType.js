import { EnumElementType } from "./EnumElementType";

export const EnumElementSubType = {
	[ EnumElementType.Markdown ]: {
		Heading: "heading",
		Context: "content",
	},
	[ EnumElementType.Range ]: {
		Discrete: "discrete",
		Continuous: "continuous",
		Binary: "binary",
	},
	[ EnumElementType.Media ]: {
		Image: "image",
		Video: "video",
		Audio: "audio",
		File: "file",
		Link: "link",
		Geo: "geo",
	},
	[ EnumElementType.DateTime ]: {
		Date: "date",
		Time: "time",
		DateTime: "datetime",
	},
	[ EnumElementType.Group ]: {
		Generic: "generic",
		Review: "review",
		Section: "section",
		List: "list",
		Map: "map",
	},
};

export const ByKeys = (type, subtype) => {
	let tg = EnumElementType?.[ type ],
		sg = EnumElementSubType?.[ tg ]?.[ subtype ];

	return sg;
};

export default {
	...EnumElementSubType,
	$ByKeys: ByKeys,
};