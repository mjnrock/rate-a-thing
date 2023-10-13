import Chord from "@lespantsfancy/chord";

import ModReview from "../modules/review/main";
import { Review as ReviewJSX } from "../modules/review/components/Review";

import { ReviewList } from "../modules/reviews/components/ReviewList";

import $$ratings from "../modules/review/data/reviews/test.schema";
import $$reviews from "../data/reviews/reviews.json";

const Nodes = Chord.Node.Node.CreateMany({
	reviews: {
		state: {
			...ModReview.Transformers.fromJson($$reviews),
		},
	},
	review: {
		state: ModReview.New({
			ratings: $$ratings,
		}),
		reducers: ModReview.Reducers,
		effects: {
			init: (...args) => {
				console.log("init", ...args);
			},
			setRatingValue: (...args) => {
				console.log("setRatingValue", ...args);
			}
		}
	},
});

export function RouteReview() {
	const { state: review, dispatch: reviewDispatch } = Chord.Node.React.useNode(Nodes.review);
	const { state: reviews, dispatch: reviewsDispatch } = Chord.Node.React.useNode(Nodes.reviews);

	return (
		<>
			<ReviewJSX
				data={ review }
				update={ reviewDispatch }
			/>

			<ReviewList
				data={ reviews }
				update={ reviewsDispatch }
			/>
		</>
	);
};

export default RouteReview;