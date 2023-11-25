import Chord from "@lespantsfancy/chord";

import TabContainer from "../modules/form/views/TabContainer";
import ModSchema from "../modules/form/modules/schema/main";
import EditSchema from "../modules/form/modules/schema/views/EditSchema";
import ModRecord from "../modules/form/modules/record/main";
import EditRecord from "../modules/form/modules/record/views/EditRecord";

const Nodes = Chord.Node.Node.CreateMany({
	schema: {
		state: ModSchema.State(),
		reducers: ModSchema.Reducers,
	},
	record: {
		state: ModRecord.State(),
		reducers: ModRecord.Reducers,
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

	console.log(recordState)

	return (
		<TabContainer
			schemaContent={ () => (
				<div className="flex flex-col w-full h-full">
					<EditSchema
						update={ schemaDispatch }
						element={ schemaState.components.elements[ schemaState.form ] }
						config={ schemaState.config }
					/>
				</div>
			) }
			writeContent={ () => (
				<EditRecord
					update={ recordDispatch }
					data={ { schemaState, recordState } }
				/>
			) }
			searchContent={ () => null }
		/>
	);
};

export default Reviews;