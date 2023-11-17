import { v4 as uuid } from "uuid";
import EnumElementType from "../EnumElementType";

export const ElementState = ({ ...rest } = {}) => {
	return {
		id: uuid(),
		type: EnumElementType.ELEMENT,
		state: {},
		meta: {},
		...rest,
	};
};

export const ElementReducers = () => ({
	set: (state, newState = {}) => ({
		...newState,
	}),
	merge: (state, newState = {}) => ({
		...state,
		...newState,
	}),
	setId: (state, newId) => ({
		...state,
		id: newId,
	}),
	setType: (state, newType) => ({
		...state,
		type: newType,
	}),
	setState: (state, newState = {}) => ({
		...state,
		state: newState,
	}),
	mergeState: (state, newState = {}) => ({
		...state,
		state: {
			...state.state,
			...newState,
		},
	}),
	setMeta: (state, newMeta = {}) => ({
		...state,
		meta: newMeta,
	}),
	mergeMeta: (state, newMeta = {}) => ({
		...state,
		meta: {
			...state.meta,
			...newMeta,
		},
	}),
});

export default {
	State: ElementState,
	Reducers: ElementReducers(),
};