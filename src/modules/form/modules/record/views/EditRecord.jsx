import { useEffect } from "react";
import { copyElement } from "../../../util/copyElement";
import EnumElementType from "../../../EnumElementType";

export function EditRecord({ update, data }) {
	const { schemaState, recordState } = data;

	useEffect(() => {
		//TODO: Implement a way to only do this minimally if there have been changes to the schema
		update("setActive", copyElement(schemaState.components.elements[ schemaState.form ]));
	}, []);

	if(Object.keys(recordState.active).length === 0) {
		return null;
	}

	const renderElement = (element) => {
		if(element.type === EnumElementType.GROUP) {
			return (
				<>
					<div
						key={ element.id }
						className="flex flex-col w-full h-full gap-2"
					>
						{ element.id } { element.type } { element.as }
					</div>
					{
						element.state.elements.map((child, i) => {
							return (
								<div
									key={ i }
									className="flex flex-col w-full h-full gap-2"
								>
									{ renderElement(child) }
								</div>
							);
						})
					}
				</>
			);
		} else {
			return (
				<div
					key={ element.id }
					className="flex flex-col w-full h-full gap-2"
				>
					{ element.id } { element.type } { element.as }
				</div>
			);
		}
	}

	return (
		<div className="flex flex-col w-full h-full gap-2">
			{ renderElement(recordState.active) }
		</div>
	);
};

export default EditRecord;