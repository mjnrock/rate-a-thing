import { v4 as uuid } from "uuid";

export const State = (value, { type, subtype, tags = [] } = {}) => ({
	$id: uuid(),
	$type: type,
	$subtype: subtype,
	$tags: tags,
	value,
});

export const Reducers = () => ({
	merge: (state, { element } = {}) => ({
		...state,
		...element,
	}),
	setId: (state, { id } = {}) => ({
		...state,
		$id: id,
	}),
	setType: (state, { type } = {}) => ({
		...state,
		$type: type,
	}),
	setSubtype: (state, { subtype } = {}) => ({
		...state,
		$subtype: subtype,
	}),
	addTags: (state, { tags } = {}) => ({
		...state,
		$tags: [
			...state.$tags,
			...tags,
		],
	}),
	removeTags: (state, { tags } = {}) => ({
		...state,
		$tags: state.$tags.filter(tag => !tags.includes(tag)),
	}),
});

export default {
	State,
	Reducers: Reducers(),
};