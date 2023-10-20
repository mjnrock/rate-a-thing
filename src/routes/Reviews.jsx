import Chord from "@lespantsfancy/chord";

import ModReviews from "../modules/reviews/main";

import Review from "../modules/reviews/elements/group/Review";
import Section from "../modules/reviews/elements/group/Section";
import Heading from "../modules/reviews/elements/markdown/Heading";
import Content from "../modules/reviews/elements/markdown/Content";

const reviews = [
	Review.State([
		Section.State([
			Heading.State("Heading 1"),
			Content.State("This is some **Content**"),
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
	const { state: reviews, dispatch: reviewsDispatch } = Chord.Node.React.useNode(Nodes.reviews);

	console.log(reviews)

	return (
		<>
			Hi
		</>
	);
};

export default RouteReviews;