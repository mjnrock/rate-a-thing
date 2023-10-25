import EnumElementType from "../lib/EnumElementType";
import EnumElementSubType from "../lib/EnumElementSubType";
import ReviewJSX from "../components/builder/elements/group/Review";
import SectionJSX from "../components/builder/elements/group/Section";
import HeadingJSX from "../components/builder/elements/markdown/Heading";
import ContentJSX from "../components/builder/elements/markdown/Content";

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

export function Schema({ data, update }) {
	const { reviewsState } = data;
	const { reviewsDispatch } = update;

	const active = reviewsState.records[ reviewsState.active[ 0 ] ];
	const schema = reviewsState.schema;
	
	console.log(reviewsState);
	console.log(active);

	//FIXME: Sort out the props

	return (
		<div>
			<ReviewJSX
				dispatch={ reviewsDispatch }
				element={ schema }
				map={ JSXMap }
				onUpdate={ console.log }
			/>
		</div>
	);
};

export default Schema;