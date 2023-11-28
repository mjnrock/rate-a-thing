export function writeHelper({ update, element, maps }) {
	const { recordDispatch } = update;
	const dispatcher = (nextState, key = "value") => {
		recordDispatch("mergeData", element.id, { [ key ]: nextState });
		return;
	};

	const state = updateFromDataMap(element, maps);
	return {
		dataDispatcher: dispatcher,
		state,
		value: state?.value,
	};
};
export function updateFromDataMap(element, maps) {
	let value = element.state;

	const { data: dataMap } = maps;
	if(dataMap[ element.id ]) {
		value = dataMap[ element.id ];
	}

	return value;
};

export default updateFromDataMap;