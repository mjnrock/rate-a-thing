import { EnumElementType } from "../../EnumElementType";
import Element from "../Element";

export const GroupState = ({ ...rest } = {}) => {
	return {
		...Element.State({
			type: EnumElementType.GROUP,
			state: {
				elements: [],
			},
		}),
		...rest,
	};
};

export const GroupReducers = () => ({
	...Element.Reducers,
	addChildType: (self, type, modelMap, ...args) => {
		const model = typeof modelMap === "function" ? modelMap(type) : modelMap[ type ];
		const element = model.State(...args);
		const elements = [ ...self.state.elements, element ];

		return {
			...self,
			state: {
				...self.state,
				elements,
			},
		};
	},
	addElement: (self, element) => ({
		...self,
		state: {
			...self.state,
			elements: [ ...self.state.elements, element ],
		},
	}),
	removeElement: (self, elementId) => ({
		...self,
		state: {
			...self.state,
			elements: self.state.elements.filter(el => el.id !== elementId),
		},
	}),
	swapElements: (self, elementId1, elementId2) => {
		const elements = self.state.elements;
		const index1 = elements.findIndex(el => el.id === elementId1);
		const index2 = elements.findIndex(el => el.id === elementId2);
		const element1 = elements[ index1 ];
		const element2 = elements[ index2 ];

		elements[ index1 ] = element2;
		elements[ index2 ] = element1;

		return {
			...self,
			state: {
				...self.state,
				elements,
			},
		};
	},
});

export default {
	State: GroupState,
	Reducers: GroupReducers(),
};