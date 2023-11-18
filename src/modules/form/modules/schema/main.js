import { EnumElementType, EnumElementSubType } from "../../EnumElementType";

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
	findElement: (group, id) => {
		// recurse through all groups and sub-groups
		let element;
		for(let i = 0; i < group.elements.length; i++) {
			element = group.elements[ i ];
			if(element.id === id) {
				return element;
			} else if(element.type === EnumElementType.GROUP) {
				element = Helpers.findElement(element, id);
				if(element) {
					return element;
				}
			}
		}

		return null;
	},
	TypeToModel: (type) => {
		let subType;
		if(Array.isArray(type)) {
			type = type[ 0 ];
			subType = type[ 1 ];
		} else if(typeof type === "object" && type.type) {
			subType = type.subType;
			type = type.type;
		}

		if(type === EnumElementType.ELEMENT) {
			return Element;
		} else if(type === EnumElementType.GROUP) {
			if(subType === EnumElementSubType[ EnumElementType.GROUP ].FORM) {
				return Form;
			} else {
				return Group;
			}
		} else if(type === EnumElementType.TEXT) {
			return Text;
		} else if(type === EnumElementType.NUMBER) {
			return NumberModel;
		} else if(type === EnumElementType.BOOLEAN) {
			if(subType === EnumElementSubType[ EnumElementType.BOOLEAN ].BITMASK) {
				return Bitmask;
			} else {
				return BooleanModel;
			}
		} else if(type === EnumElementType.OBJECT) {
			return ObjectModel;
		} else if(type === EnumElementType.ARRAY) {
			return ArrayModel;
		} else if(type === EnumElementType.INPUT) {
			if(subType === EnumElementSubType[ EnumElementType.INPUT ].MARKDOWN) {
				return Markdown;
			} else if(subType === EnumElementSubType[ EnumElementType.INPUT ].RATING) {
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
	toDataMap: (element, data = {}) => {
		/* Recursively flatten the schema into a UUID-map of elements */
		if(element.type === EnumElementType.GROUP) {
			for(let i = 0; i < element.state.elements.length; i++) {
				Utility.toDataMap(element.state.elements[ i ], data);
			}
		} else {
			data[ element.id ] = element;
		}

		/* For use in meta analysis, extract the groups into an additional, separate map */
		let groups = {};
		for(let i = 0; i < element.state.elements.length; i++) {
			if(element.elements[ i ].type === EnumElementType.GROUP) {
				groups[ element.state.elements[ i ].id ] = element.state.elements[ i ].map((element) => element.id);
			}
		}

		return {
			elements: data,
			groups,
		};
	},
};

export const State = ({ form = {}, ...rest } = {}) => {
	return {
		form: Form.State(form),
		...rest,
	};
};

export const Reducers = () => ({
	set: (state, next) => next,
	merge: (state, next) => ({ ...state, ...next }),

	addElementByType: (state, type) => {
		const { form } = state;

		let next = Form.Reducers.addElementByType(form, type, Helpers.TypeToModel);

		return {
			...state,
			form: next,
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