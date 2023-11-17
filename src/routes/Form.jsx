import Chord from "@lespantsfancy/chord";

import ModRecord from "../modules/form/modules/schema/main";

import TypeBar from "../modules/form/modules/schema/components/TypeBar";

const Nodes = Chord.Node.Node.CreateMany({
	schema: {
		state: ModRecord.State(),
		reducers: ModRecord.Reducers,
	},
	record: {
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
	const { state: recordState, dispatch: recordDispatch } = Chord.Node.React.useNode(Nodes.record);
	const { state: repositoryState, dispatch: repositoryDispatch } = Chord.Node.React.useNode(Nodes.repository);

	return (
		<div>
			<TypeBar
				data={ schemaState }
				update={ schemaDispatch }
			/>

			{
				schemaState.form.state.elements.map((element, i) => {
					return (
						<div
							key={ `form-element-${ i }` }
							className="flex flex-row p-2 m-2 border border-solid rounded shadow cursor-pointer select-none border-neutral-200 hover:bg-sky-100 hover:border-sky-200 hover:text-sky-500 active:bg-sky-700 active:border-sky-50 active:text-sky-50"
							onClick={ e => {

							} }
						>
							<span className="font-bold">{ element.type }</span>
							&nbsp;
							<span className="font-mono">{ element.id }</span>
						</div>
					)
				})
			}
		</div>
	)
};

export default Reviews;