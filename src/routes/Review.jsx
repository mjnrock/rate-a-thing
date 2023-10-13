import { useEffect } from "react";
import Chord from "@lespantsfancy/chord";

import ModReview from "../modules/review/main";
import { Review as ReviewJSX } from "../modules/review/components/Review";

import { ReviewList } from "../modules/reviews/components/ReviewList";

import $$ratings from "../modules/review/data/reviews/test.schema";

console.log(
	ModReview.Reducers.New({
		ratings: $$ratings,
	})
);
console.log(
	ModReview.Reducers.init(ModReview.State(), {
		ratings: $$ratings,
	})
);

const Nodes = Chord.Node.Node.CreateMany({
	reviews: {
		state: {
			reviews: [
				ModReview.Reducers.New({
					ratings: $$ratings,
				}),
				ModReview.Reducers.New({
					ratings: $$ratings,
				}),
				ModReview.Reducers.New({
					ratings: $$ratings,
				}),
			],
		},
	},
	review: {
		state: ModReview.Reducers.init(ModReview.State(), {
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

	console.log(reviews)

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