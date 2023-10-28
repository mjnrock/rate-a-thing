import Chord from "@lespantsfancy/chord";

const Nodes = Chord.Node.Node.CreateMany({
	review: {},
});

export function Reviews() {
	const { state: reviewState, dispatch: reviewDispatch } = Chord.Node.React.useNode(Nodes.review);

	return (
		<div>
			Hi
		</div>
	)
};

export default Reviews;