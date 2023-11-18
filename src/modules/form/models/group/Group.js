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
	addElementByType: (state, type, modelMap, ...args) => {
		const model = typeof modelMap === "function" ? modelMap(type) : modelMap[ type ];
		const element = model.State(...args);
		const elements = [ ...state.state.elements, element ];

		return {
			...state,
			state: {
				...state.state,
				elements,
			},
		};
	},
	addElement: (state, element) => ({
		...state,
		state: {
			...state.state,
			elements: [ ...state.state.elements, element ],
		},
	}),
	removeElement: (state, elementId) => ({
		...state,
		state: {
			...state.state,
			elements: state.state.elements.filter(el => el.id !== elementId),
		},
	}),
	swapElements: (state, elementId1, elementId2) => {
		const elements = state.state.elements;
		const index1 = elements.findIndex(el => el.id === elementId1);
		const index2 = elements.findIndex(el => el.id === elementId2);
		const element1 = elements[ index1 ];
		const element2 = elements[ index2 ];

		elements[ index1 ] = element2;
		elements[ index2 ] = element1;

		return {
			...state,
			state: {
				...state.state,
				elements,
			},
		};
	},
});

export default {
	State: GroupState,
	Reducers: GroupReducers(),
};