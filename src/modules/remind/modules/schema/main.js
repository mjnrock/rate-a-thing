import { v4 as uuid } from "uuid";
import { deepClone } from "../../../../util/deepClone";

import { EnumElementType } from "../../EnumElementType";

import { TypeModelMap, AsModelMap, Models } from "../../models/package";

export const Helpers = {
	duplicateElementWithChildren: (element) => {
		const model = Utility.getModelByType(element.type);
		const nextElement = model.State({
			...deepClone(element),
			id: uuid(),
		});

		if(element.type === EnumElementType.GROUP) {
			nextElement.state.elements = element.state.elements.map(child =>
				Helpers.duplicateElementWithChildren(child)
			);
		}

		return nextElement;
	},
	findElement: (state, id) => {
		if("id" in state && "type" in state) {
			if(state.type === EnumElementType.GROUP) {
				for(let i = 0; i < state.state.elements.length; i++) {
					let current = state.state.elements[ i ];
					if(current.id === id) {
						return current;
					} else {
						let result = Helpers.findElement(current, id);
						if(result) {
							return result;
						}
					}
				}
			}

			return false;
		}

		return state.components.elements[ id ];
	},
	findParent: (state, id) => {
		if("id" in state && "type" in state) {
			if(state.type === EnumElementType.GROUP) {
				for(let i = 0; i < state.state.elements.length; i++) {
					let current = state.state.elements[ i ];
					if(current.id === id) {
						return state;
					} else {
						let result = Helpers.findParent(current, id);
						if(result) {
							return result;
						}
					}
				}
			}

			return false;
		}

		for(let key in state.components.groups) {
			const group = state.components.groups[ key ];
			if(group.includes(id)) {
				return state.components.elements[ key ];
			}
		}

		return false;
	},
	getForm: (state) => {
		return Helpers.findElement(state, state.form);
	},
};

export const Utility = {
	getModelByType: (type) => {
		let as;
		if(Array.isArray(type)) {
			[ type, as ] = type;
		} else if(typeof type === "object" && type.type) {
			as = type.as;
			type = type.type;
		}

		if(as in AsModelMap[ type ]) {
			return AsModelMap[ type ][ as ];
		} else if(type in TypeModelMap) {
			return TypeModelMap[ type ];
		} else {
			return TypeModelMap[ EnumElementType.ELEMENT ];
		}
	},
	toComponentMap: (element, data = {}) => {
		/* Recursively flatten the schema into a UUID-map of elements */
		if(element.type === EnumElementType.GROUP) {
			data[ element.id ] = element;
			for(let i = 0; i < element.state.elements.length; i++) {
				Utility.toComponentMap(element.state.elements[ i ], data);
			}
		} else {
			data[ element.id ] = element;
		}

		/* For use in meta analysis, extract the groups into an additional, separate map */
		const extractGroups = (element, groups = {}) => {
			if(element.type === EnumElementType.GROUP) {
				groups[ element.id ] = element.state.elements.map((element) => element.id);

				for(let i = 0; i < element.state.elements.length; i++) {
					extractGroups(element.state.elements[ i ], groups);
				}
			}

			return groups;
		};

		return {
			elements: data,
			groups: extractGroups(element),
		};
	},
};

export const State = ({ form = {}, ...rest } = {}) => {
	const nextForm = Models.Group.Form.State(form);

	const next = {
		form: nextForm.id,
		components: Utility.toComponentMap(nextForm),
		...rest,
		config: {
			isCollapsed: true,
			...(rest?.config ?? {}),
		},
	};

	return next;
};

export const Reducers = () => ({
	set: (state, next) => next,
	merge: (state, next) => ({ ...state, ...next }),
	setForm: (state, nextForm) => {
		return {
			...state,
			form: nextForm.id,
			components: Utility.toComponentMap(nextForm),
		};
	},
	setConfig: (state, nextConfig) => {
		return {
			...state,
			config: {
				...state.config,
				...nextConfig,
			},
		};
	},


	addElementByType: (state, parentId, type, as) => {
		const model = Utility.getModelByType(type);
		const element = model.State({ as });

		const next = deepClone(state);
		const nextForm = Helpers.getForm(next);

		if(!parentId || parentId === next.form) {
			nextForm.state.elements.push(element);
		} else {
			const parentElement = Helpers.findElement(nextForm, parentId);

			if(parentElement.type === EnumElementType.GROUP) {
				next.components.elements[ parentElement.id ].state.elements.push(element);
			}
		}

		return {
			...next,
			components: Utility.toComponentMap(nextForm),
		};
	},
	removeElement: (state, id) => {
		const next = deepClone(state);
		const nextForm = Helpers.getForm(next);

		const parent = Helpers.findParent(nextForm, id);
		if(parent?.type === EnumElementType.GROUP) {
			const index = parent.state.elements.findIndex((element) => element.id === id);
			parent.state.elements.splice(index, 1);
		}

		return {
			...next,
			components: Utility.toComponentMap(nextForm),
		};
	},
	changeElementType: (state, id, type) => {
		const next = deepClone(state);
		const nextForm = Helpers.getForm(next);
		const element = Helpers.findElement(next, id);

		if(element && element.type !== type) {
			const model = Utility.getModelByType(type);
			const nextElement = model.State({
				id: element.id,
			});

			const parent = Helpers.findParent(nextForm, id);
			if(parent?.type === EnumElementType.GROUP) {
				const index = parent.state.elements.findIndex((element) => element.id === id);
				parent.state.elements[ index ] = nextElement;
			}
		}

		return {
			...next,
			components: Utility.toComponentMap(nextForm),
		};
	},
	changeElementAs: (state, id, as) => {
		const next = deepClone(state);
		const nextForm = Helpers.getForm(next);
		const element = Helpers.findElement(next, id);

		if(element) {
			const model = Utility.getModelByType([ element.type, as ]);
			const nextElement = model.State({ id: element.id, as });

			if(as === null) {
				delete nextElement.as;
			}

			const parent = Helpers.findParent(nextForm, id);
			if(parent?.type === EnumElementType.GROUP) {
				const index = parent.state.elements.findIndex((element) => element.id === id);
				parent.state.elements[ index ] = nextElement;
			}
		}

		return {
			...next,
			components: Utility.toComponentMap(nextForm),
		};
	},
	setLabel: (state, id, label) => {
		const next = deepClone(state);
		const element = Helpers.findElement(next, id);

		if(element) {
			element.meta.label = label;
		}

		return next;
	},
	swapChildren: (state, gid, cid1, cid2) => {
		const next = deepClone(state);
		const nextForm = Helpers.getForm(next);
		const group = gid === nextForm.id ? nextForm : Helpers.findElement(nextForm, gid);

		console.log(gid, cid1, cid2)
		console.log(group)

		if(group?.type === EnumElementType.GROUP) {
			const index1 = group.state.elements.findIndex((element) => element.id === cid1);
			const index2 = group.state.elements.findIndex((element) => element.id === cid2);

			if(index1 !== -1 && index2 !== -1) {
				[ group.state.elements[ index1 ], group.state.elements[ index2 ] ] = [ group.state.elements[ index2 ], group.state.elements[ index1 ] ];
			}
		}

		return {
			...next,
			components: Utility.toComponentMap(nextForm),
		};
	},
	moveChildToIndex: (state, gid, cid, index) => {
		const next = deepClone(state);
		const nextForm = Helpers.getForm(next);
		const group = gid === nextForm.id ? nextForm : Helpers.findElement(nextForm, gid);

		if(group?.type === EnumElementType.GROUP) {
			const child = Helpers.findElement(group, cid);
			if(child) {
				const childIndex = group.state.elements.findIndex((element) => element.id === cid);
				group.state.elements.splice(childIndex, 1);
				group.state.elements.splice(index, 0, child);
			}
		}

		return {
			...next,
			components: Utility.toComponentMap(nextForm),
		};
	},
	toggleConfigSetting: (state, key, value) => {
		const next = deepClone(state);

		if(key in next.config) {
			next.config[ key ] = value ?? !next.config[ key ];
		}

		return next;
	},
	setElementValue: (state, id, value) => {
		const next = deepClone(state);
		const element = Helpers.findElement(next, id);

		if(element) {
			element.state.value = value;
		}

		return next;
	},
	mergeElementState: (state, id, next) => {
		const nextForm = Helpers.getForm(state);
		const element = Helpers.findElement(nextForm, id);

		if(element) {
			element.state = {
				...element.state,
				...next,
			};
		}

		return {
			...state,
			components: Utility.toComponentMap(nextForm),
		};
	},
	duplicateChild: (state, cid) => {
		const next = deepClone(state);
		const nextForm = Helpers.getForm(next);
		const child = Helpers.findElement(nextForm, cid);
		const parent = Helpers.findParent(nextForm, cid);

		if(child && parent) {
			const index = parent.state.elements.findIndex(element => element.id === cid);
			const nextChild = Helpers.duplicateElementWithChildren(child);

			parent.state.elements.splice(index + 1, 0, nextChild);
		}

		return {
			...next,
			components: Utility.toComponentMap(nextForm),
		};
	},
});
export const Effects = () => ({});

export default {
	State,
	Reducers: Reducers(),
	Effects: Effects(),
	Helpers,
};