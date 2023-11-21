import Chord from "@lespantsfancy/chord";

import ModSchema from "../modules/form/modules/schema/main";

import TypeBar from "../modules/form/modules/schema/components/TypeBar";
import Element from "../modules/form/modules/schema/components/Element";

const Nodes = Chord.Node.Node.CreateMany({
	schema: {
		state: ModSchema.State(),
		reducers: ModSchema.Reducers,
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

	console.log(schemaState);

	return (
		<div>
			{
				schemaState.components.groups[ schemaState.form ].map((elementId, i) => {
					return (
						<div
							key={ elementId }
							className="flex flex-row flex-grow p-2 m-2 border border-solid rounded shadow cursor-pointer select-none basis-1 border-neutral-200 hover:bg-sky-100 hover:border-sky-200 hover:text-sky-500 active:bg-sky-700 active:border-sky-50 active:text-sky-50"
						>
							<Element
								update={ schemaDispatch }
								element={ schemaState.components.elements[ elementId ] }
							/>
						</div>
					)
				})
			}
			<TypeBar
				update={ schemaDispatch }
				element={ schemaState.components.elements[ schemaState.form ] }
				startCollapsed={ false }
			/>
		</div>
	);
};

export default Reviews;