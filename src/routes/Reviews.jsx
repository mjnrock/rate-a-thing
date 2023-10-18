import Chord from "@lespantsfancy/chord";

import ModReviews from "../modules/reviews/main";

const Nodes = Chord.Node.Node.CreateMany({
    reviews: {
        state: {
			...ModReviews.State(),
        },
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