import Chord from "@lespantsfancy/chord";

import ModReviews from "../modules/reviews/main";

import Review from "../modules/reviews/elements/group/Review";
import Section from "../modules/reviews/elements/group/Section";
import Heading from "../modules/reviews/elements/markdown/Heading";
import Content from "../modules/reviews/elements/markdown/Content";

import EnumElementSubType from "../modules/reviews/lib/EnumElementSubType";
import ReviewJSX from "../modules/reviews/components/elements/group/Review";
import SectionJSX from "../modules/reviews/components/elements/group/Section";
import HeadingJSX from "../modules/reviews/components/elements/markdown/Heading";
import ContentJSX from "../modules/reviews/components/elements/markdown/Content";
import EnumElementType from "../modules/reviews/lib/EnumElementType";

const JSXMap = {
	[ EnumElementType.Group ]: {
		[ EnumElementSubType.Group.Review ]: ReviewJSX,
		[ EnumElementSubType.Group.Section ]: SectionJSX,
	},
	[ EnumElementType.Markdown ]: {
		[ EnumElementSubType.Markdown.Heading ]: HeadingJSX,
		[ EnumElementSubType.Markdown.Content ]: ContentJSX,
	},
};

const reviews = [
	Review.State([
		Section.State([
			Heading.State("Heading 1"),
			Content.State("This _is_ some **Content**"),
		]),
	]),
];

const Nodes = Chord.Node.Node.CreateMany({
	reviews: {
		state: ModReviews.State({ reviews }),
		reducers: ModReviews.Reducers,
	},
});


export function RouteReviews() {
	const { state: reviewsState, dispatch: reviewsDispatch } = Chord.Node.React.useNode(Nodes.reviews);

	const onUpdate = (id, value) => {
		reviewsDispatch({
			type: "updateElementValue",
			data: {
				id,
				value,
			},
		});
	};

	return (
		<>
			{
				reviewsState.reviews.map((review, i) => {
					return (
						<ReviewJSX
							key={ i }
							map={ JSXMap }
							element={ review }
							onUpdate={ onUpdate }
						/>
					);
				})
			}
		</>
	);
};

export default RouteReviews;