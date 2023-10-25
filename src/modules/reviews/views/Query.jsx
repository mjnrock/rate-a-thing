import EnumElementType from "../lib/EnumElementType";
import EnumElementSubType from "../lib/EnumElementSubType";
import ReviewJSX from "../components/finder/elements/group/Review";
import SectionJSX from "../components/finder/elements/group/Section";
import HeadingJSX from "../components/finder/elements/markdown/Heading";
import ContentJSX from "../components/finder/elements/markdown/Content";

export const JSXMap = {
	[ EnumElementType.Group ]: {
		[ EnumElementSubType.Group.Review ]: ReviewJSX,
		[ EnumElementSubType.Group.Section ]: SectionJSX,
	},
	[ EnumElementType.Markdown ]: {
		[ EnumElementSubType.Markdown.Heading ]: HeadingJSX,
		[ EnumElementSubType.Markdown.Content ]: ContentJSX,
	},
};

export function Query() {
	return (
		<div>
			Query
		</div>
	);
};

export default Query;