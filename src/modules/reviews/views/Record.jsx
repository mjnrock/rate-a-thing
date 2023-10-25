import EnumElementType from "../lib/EnumElementType";
import EnumElementSubType from "../lib/EnumElementSubType";
import ReviewJSX from "../components/editor/elements/group/Review";
import SectionJSX from "../components/editor/elements/group/Section";
import HeadingJSX from "../components/editor/elements/markdown/Heading";
import ContentJSX from "../components/editor/elements/markdown/Content";

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

//FIXME: In present state, this is managing multiple review records, not just one
// As such, the file IO is importing the { reviews: [...] } object from state

export function Record({ data, update }) {
	const { reviewsState } = data;
	const { reviewsDispatch } = update;

	const active = reviewsState.records[ reviewsState.active[ 0 ] ];
	
	console.log(reviewsState);
	console.log(active);

	return (
		<div>
		<ReviewJSX
				element={ active }
				map={ JSXMap }
				onUpdate={ console.log }
			/>
		</div>
	);
};

export default Record;