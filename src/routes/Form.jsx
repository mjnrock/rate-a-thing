import Chord from "@lespantsfancy/chord";

import TabContainer from "../modules/form/views/TabContainer";
import ModSchema from "../modules/form/modules/schema/main";
import FormSchema from "../modules/form/modules/schema/components/ElementForm";

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

	console.log(Object.keys(schemaState.components.elements).length, schemaState.components.elements);
	console.log(Object.keys(schemaState.components.groups).length, schemaState.components.groups);

	return (
		<TabContainer
			schemaContent={ () => (
				<div className="flex flex-col w-full h-full">
					<FormSchema
						update={ schemaDispatch }
						element={ schemaState.components.elements[ schemaState.form ] }
						config={ schemaState.config }
					/>
				</div>
			) }
			writeContent={ () => null }
			searchContent={ () => null }
		/>
	);
};

export default Reviews;