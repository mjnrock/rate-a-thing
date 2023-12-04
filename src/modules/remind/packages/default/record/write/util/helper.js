export function writeHelper({ update, element, maps }) {
	const { recordDispatch } = update;
	const dispatcher = (value, key = "value") => {
		//NOTE: Remember that "mergeData" is a reducer for the *module* state, not the *element* state.
		if(key === true && typeof value === "object") {
			// de facto "set"
			recordDispatch("mergeData", element.id, value);
		} else if(key) {
			// de facto "merge"
			recordDispatch("mergeData", element.id, { ...element.state, [ key ]: value });
		}

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