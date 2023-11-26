import { v4 as uuidv4 } from "uuid";
import { EnumElementType } from "../EnumElementType";

export const copyElement = (element) => {
	// Create a deep copy of the element
	const elementCopy = JSON.parse(JSON.stringify(element));

	// Assign a new UUID
	elementCopy.id = uuidv4();

	// If the element is a group, recursively copy its nested elements
	if(elementCopy.type === EnumElementType.GROUP) {
		elementCopy.state.elements = elementCopy.state.elements.map(copyElement);
	}

	return elementCopy;
};

export default copyElement;