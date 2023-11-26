import Chord from "@lespantsfancy/chord";

import ModelRecordSearchContainer from "../modules/remind/components/ModelRecordSearchContainer";
import ReadWriteContainer from "../modules/remind/components/ReadWriteContainer";

import ModSchema from "../modules/remind/modules/schema/main";
import EditSchema from "../modules/remind/modules/schema/views/EditSchema";

import ModRecord from "../modules/remind/modules/record/main";
import EditRecord from "../modules/remind/modules/record/views/EditRecord";
import ViewRecord from "../modules/remind/modules/record/views/ViewRecord";
import { useEffect } from "react";

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

	return (
		<ModelRecordSearchContainer
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
				<ReadWriteContainer
					readContent={ () => (
						<ViewRecord
							update={ { recordDispatch } }
							data={ {
								schemaState,
								recordState,
								repositoryState,
							} }
						/>
					) }
					writeContent={ () => (
						<EditRecord
							update={ { recordDispatch } }
							data={ {
								schemaState,
								recordState,
								repositoryState,
							} }
						/>
					) }
				/>
			) }
			searchContent={ () => null }
		/>
	);
};

export default Reviews;