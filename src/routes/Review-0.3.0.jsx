import Chord from "@lespantsfancy/chord";

const Nodes = Chord.Node.Node.CreateMany({
	review: {
		state: {
			current: "This is the review",
		},
		reducers: {
			setCurrent(state, action) {
				return {
					...state,
					current: action.payload,
				};
			},
		},
	},
});

export function Reviews() {
	const { state: reviewState, dispatch: reviewDispatch } = Chord.Node.React.useNode(Nodes.review);

	return (
		<div>
			{ reviewState.current }
		</div>
	)
};

export default Reviews;