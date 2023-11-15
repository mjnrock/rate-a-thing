import Chord from "@lespantsfancy/chord";

const Nodes = Chord.Node.Node.CreateMany({
	schema: {
		state: {},
		reducers: {},
	},
	active: {
		state: {},
		reducers: {},
	},
	repository: {
		state: {},
		reducers: {},
	},
});

export function Reviews() {
	const { state: schemaState, dispatch: schemaDispatch } = Chord.Node.React.useNode(Nodes.schema);
	const { state: activeState, dispatch: activeDispatch } = Chord.Node.React.useNode(Nodes.active);
	const { state: repositoryState, dispatch: repositoryDispatch } = Chord.Node.React.useNode(Nodes.repository);

	return (
		<div>
			Farts
		</div>
	)
};

export default Reviews;