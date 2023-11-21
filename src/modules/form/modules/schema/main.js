import { deepClone } from "../../../../util/deepClone";

import { EnumElementType, EnumFormElementType } from "../../EnumElementType";

import Element from "../../models/Element";
import Group from "../../models/group/Group";
import Form from "../../models/group/Form";
import Text from "../../models/text/Text";
import NumberModel from "../../models/number/Number";
import BooleanModel from "../../models/boolean/Boolean";
import Bitmask from "../../models/boolean/Bitmask";
import ArrayModel from "../../models/array/Array";
import ObjectModel from "../../models/object/Object";
import Input from "../../models/input/Input";
import Markdown from "../../models/input/Markdown";
import Rating from "../../models/input/Rating";

export const Helpers = {
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
	getForm: (state) => {
		return Helpers.findElement(state, state.form);
	},
	TypeToModel: (type) => {
		let as;
		if(Array.isArray(type)) {
			type = type[ 0 ];
			as = type[ 1 ];
		} else if(typeof type === "object" && type.type) {
			as = type.as;
			type = type.type;
		}

		if(type === EnumElementType.ELEMENT) {
			return Element;
		} else if(type === EnumElementType.GROUP) {
			if(as === EnumFormElementType[ EnumElementType.GROUP ].FORM) {
				return Form;
			} else {
				return Group;
			}
		} else if(type === EnumElementType.TEXT) {
			return Text;
		} else if(type === EnumElementType.NUMBER) {
			return NumberModel;
		} else if(type === EnumElementType.BOOLEAN) {
			if(as === EnumFormElementType[ EnumElementType.BOOLEAN ].BITMASK) {
				return Bitmask;
			} else {
				return BooleanModel;
			}
		} else if(type === EnumElementType.OBJECT) {
			return ObjectModel;
		} else if(type === EnumElementType.ARRAY) {
			return ArrayModel;
		} else if(type === EnumElementType.INPUT) {
			if(as === EnumFormElementType[ EnumElementType.INPUT ].MARKDOWN) {
				return Markdown;
			} else if(as === EnumFormElementType[ EnumElementType.INPUT ].RATING) {
				return Rating;
			} else {
				return Input;
			}
		} else {
			throw new Error(`Unknown type: ${ type }`);
		}
	},
};

export const Utility = {
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
					let child = extractGroups(element.state.elements[ i ], groups);
				}
			}

			return groups;
		};

		console.log(extractGroups(element))

		return {
			elements: data,
			groups: extractGroups(element),
		};
	},
};

export const State = ({ form = {}, ...rest } = {}) => {
	const nextForm = Form.State(form);

	const next = {
		form: nextForm.id,
		components: Utility.toComponentMap(nextForm),
		...rest,
	};

	return next;
};

export const Reducers = () => ({
	set: (state, next) => next,
	merge: (state, next) => ({ ...state, ...next }),

	addElementByType: (state, type, parentId) => {
		const model = Helpers.TypeToModel(type);
		const element = model.State();

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
	}
});
export const Effects = () => ({});

export default {
	State,
	Reducers: Reducers(),
	Effects: Effects(),
	Helpers,
};