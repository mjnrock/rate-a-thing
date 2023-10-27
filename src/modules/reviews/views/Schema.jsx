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

	const schema = reviewsState.schema;

	//TODO: Formalize the concept of Aliases (e.g. Text: [ "markdown", "content" ], Rating: [ "range", "discrete" ]), etc.)
	//FIXME: Sort out the props

	return (
		<div>
			<ReviewJSX
				dispatch={ reviewsDispatch }
				element={ schema }
				map={ JSXMap }
				onUpdate={ (id, value) => reviewsDispatch({
					type: "updateSchemaValue",
					data: {
						id,
						value,
					},
				}) }
			/>
		</div>
	);
};

export default Schema;