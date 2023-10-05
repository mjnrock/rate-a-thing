import { useEffect } from "react";
import Chord from "@lespantsfancy/chord";

import { Reducers, Nodes } from "../modules/rat/main";
import { Review as ReviewJSX } from "../modules/rat/components/Review";

import $$ratings from "../modules/rat/data/reviews/test.schema";

export function Review() {
	const { state: review, dispatch: reviewDispatch } = Chord.Node.React.useNode(Nodes.review);

	useEffect(() => {
		reviewDispatch({
			type: "init",
			data: {
				ratings: $$ratings,
			},
		});
	}, []);

	return (
		<>
			<ReviewJSX
				data={ review }
				update={ reviewDispatch }
			/>
		</>
	);
};

export default Review;