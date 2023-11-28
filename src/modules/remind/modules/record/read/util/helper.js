export function readHelper({ element, maps }) {
	return updateFromDataMap(element, maps);
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