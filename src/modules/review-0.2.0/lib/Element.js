import { v4 as uuid } from "uuid";

export const Helpers = {};

export const State = (state, { type, id, ...rest } = {}) => ({
	id: id ?? uuid(),
	type,
	state,
	...rest,
});

export const Reducers = () => ({
	merge: (state, { element } = {}) => ({
		...state,
		...element,
	}),
	setId: (state, { id } = {}) => ({
		...state,
		id: id,
	}),
	setType: (state, { type } = {}) => ({
		...state,
		type: type,
	}),
	setState: (state, { state: next } = {}) => ({
		...state,
		state: next,
	}),
});

export const Effect = () => ({});

export default {
	State,
	Reducers: Reducers(),
	Effect: Effect(),
	Helpers,
};